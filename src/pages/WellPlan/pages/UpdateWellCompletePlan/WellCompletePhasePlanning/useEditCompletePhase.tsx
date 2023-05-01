import { notification } from 'antd';
import wellsQueryKeys from 'api/queryKeys/wells';
import {
  TenantsService,
  WellPlannerDetails,
  WellPlannerDetailsCompleteStep,
} from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import useInvalidateWellCompletePlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellCompletePlanCO2Cache';
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

const useEditCompletePhase = ({
  wellPlanId,
  wellPlanStep,
  onSuccess,
}: {
  wellPlanId: number | undefined;
  wellPlanStep: WellPlannerDetailsCompleteStep | undefined;
  onSuccess: () => void;
}) => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const initialValues = getInitialValues(wellPlanStep);
  const { invalidateWellCompletePlanCO2Cache } =
    useInvalidateWellCompletePlanCO2Cache();
  const { phaseIdMap } = useWellPlannerPhases(wellPlanId);
  const editCompletePhaseMutation = useMutation<
    WellPlannerDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsWellsPlannersCompleteStepsUpdateUpdate(
          Number(tenantId),
          Number(wellPlanStep?.id),
          Number(wellPlanId),
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
        await invalidateWellCompletePlanCO2Cache(data.id);
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
    editCompletePhaseMutation,
  };
};

export default useEditCompletePhase;
