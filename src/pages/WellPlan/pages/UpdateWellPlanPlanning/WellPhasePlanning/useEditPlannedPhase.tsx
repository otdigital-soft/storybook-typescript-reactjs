import { notification } from 'antd';
import wellsQueryKeys from 'api/queryKeys/wells';
import {
  TenantsService,
  WellPlannerDetails,
  WellPlannerDetailsPlannedStep,
} from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import useInvalidateWellPlannedPlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellPlannedPlanCO2Cache';
import useWellPlannerPhases from 'pages/WellPlan/hooks/useWellPlannerPhases';
import { useMutation, useQueryClient } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import {
  FormValues,
  getInitialValues,
  normalizeFormValues,
  schema,
} from 'pages/Wells/containers/PhaseForm';

const useEditPlannedPhase = ({
  wellPlanId,
  wellPlanStep,
  onSuccess,
}: {
  wellPlanId: number | undefined;
  wellPlanStep: WellPlannerDetailsPlannedStep | undefined;
  onSuccess: () => void;
}) => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const {
    invalidateWellPlannedPlanCO2Cache,
    invalidateWellPlannedStepCO2Cache,
  } = useInvalidateWellPlannedPlanCO2Cache();
  const { phaseIdMap } = useWellPlannerPhases(wellPlanId);
  const initialValues = getInitialValues(wellPlanStep);
  const editPlannedPhaseMutation = useMutation<
    WellPlannerDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsWellsPlannersPlannedStepsUpdateUpdate(
          Number(tenantId),
          Number(wellPlanId),
          Number(wellPlanStep?.id),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data, { values }) => {
        const wellPlanQueryKey = wellsQueryKeys.wellPlan(
          Number(tenantId),
          data.id,
        );
        queryClient.setQueryData<WellPlannerDetails>(wellPlanQueryKey, data);
        const phaseName: string = phaseIdMap[Number(values.phase)]?.name || '';
        notification.success({
          message: 'Updated phase',
          description: (
            <>
              Phase <strong>{phaseName}</strong> has been updated.
            </>
          ),
        });
        await invalidateWellPlannedPlanCO2Cache(data.id);
        await invalidateWellPlannedStepCO2Cache(
          data.id,
          Number(wellPlanStep?.id),
        );
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to update a phase. Please try later.',
        );

        Logger.error(
          `Unable to update a WellPlannerStep(id=${wellPlanStep?.id}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues,
    validationSchema: schema,
    editPlannedPhaseMutation,
  };
};

export default useEditPlannedPhase;
