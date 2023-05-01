import projectsServices from 'api/services/projects';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import projectsQueryKeys from 'api/queryKeys/projects';
import { notification } from 'antd';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import Logger from 'utils/logger';
import { FormValues } from 'containers/PlanForm/form';
import { schema } from 'containers/PlanForm/schema';
import {
  emptyFormValues,
  normalizeFormValues,
} from 'containers/PlanForm/utils';
import { useCallback } from 'react';
import { CustomRigList, CustomWellList, PlanDetails } from 'api/schema';
import { encodeRig } from 'utils/rigs';

const useUpdatePlan = ({
  projectId,
  projectRigs,
  projectWells,
  planId,
  plan,
}: {
  projectId: number;
  planId: number;
  projectWells: CustomWellList[] | undefined;
  projectRigs: CustomRigList[] | undefined;
  plan: PlanDetails | undefined;
}) => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const addedWellsIds = plan?.wells.map((well) => well.id) || [];
  const initialValues: FormValues = {
    name: plan?.name || '',
    description: plan?.description || '',
    block_name: plan?.block_name || '',
    distance_from_tug_base_to_previous_well:
      plan?.distance_from_tug_base_to_previous_well ?? '',
    reference_rig: plan ? encodeRig(plan.reference_rig) : null,
    availableWells:
      projectWells
        ?.filter((well) => !addedWellsIds.includes(well.id))
        .map((well) => ({
          id: well.id,
          name: well.name || '',
          distance_from_previous_location: '' as const,
          distance_to_helicopter_base: '' as const,
          distance_to_psv_base: '' as const,
          distance_to_ahv_base: '' as const,
          distance_to_tug_base: '' as const,
          jackup_positioning_time: '' as const,
          semi_positioning_time: '' as const,
          operational_time: '' as const,
        })) || [],
    addedWells: plan?.wells || [],
    // read only
    projectRigs: projectRigs || [],
  };

  const mutation = useMutation<
    void,
    Error,
    { values: FormValues; formikHelpers: FormikHelpers<FormValues> }
  >(
    async ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      const data = await projectsServices.updatePlan(
        tenantId,
        projectId,
        planId,
        normalizeFormValues(values),
      );
      await queryClient.invalidateQueries(
        projectsQueryKeys.allPlans(tenantId, projectId),
      );
      notification.success({
        message: 'Saved plan',
        description: (
          <>
            Plan "<strong>{data.name}</strong>" has been saved.
          </>
        ),
      });
      navigate(generatePath(routes.project, { projectId: String(projectId) }));
    },
    {
      onError: (error, { values, formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to update the plan. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        Logger.error(`Unable to update the Plan(id=${planId})`, error, values);
      },
    },
  );
  const onClear = useCallback(
    (formikHelpers: FormikHelpers<FormValues>) => {
      formikHelpers.resetForm({
        values: emptyFormValues({
          projectWells: projectWells || [],
          projectRigs: projectRigs || [],
        }),
      });
    },
    [projectRigs, projectWells],
  );

  return {
    mutation,
    initialValues,
    onClear,
    schema,
  };
};

export default useUpdatePlan;
