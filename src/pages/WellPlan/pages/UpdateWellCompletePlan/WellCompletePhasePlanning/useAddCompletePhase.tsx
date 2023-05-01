import { notification } from 'antd';
import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService, WellPlannerDetails } from 'api/schema';
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

const useAddCompletePhase = ({
  wellPlanId,
  onSuccess,
}: {
  wellPlanId: number | undefined;
  onSuccess: () => void;
}) => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const { invalidateWellCompletePlanCO2Cache } =
    useInvalidateWellCompletePlanCO2Cache();
  const { phaseIdMap } = useWellPlannerPhases(wellPlanId);
  const addCompletePhaseMutation = useMutation<
    WellPlannerDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsWellsPlannersCompleteStepsCreateCreate(
          Number(tenantId),
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
          message: 'Added phase',
          description: (
            <>
              Phase <strong>{phaseName}</strong> has been added.
            </>
          ),
        });
        await invalidateWellCompletePlanCO2Cache(data.id);
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new phase. Please try later.',
        );

        Logger.error(
          `Unable to add a new complete phase to WellPlanner(id=${wellPlanId}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getInitialValues(),
    validationSchema: schema,
    addCompletePhaseMutation,
  };
};

export default useAddCompletePhase;
