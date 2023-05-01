import { notification } from 'antd';
import { TenantsService, WellPlannerDetails } from 'api/schema';
import useTenant from 'hooks/useTenant';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useInvalidateWellCompletePlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellCompletePlanCO2Cache';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useMutation } from 'react-query';
import Logger from 'utils/logger';

const useUpdateCompletePhaseEmissionReductionInitiatives = () => {
  const { tenantId } = useTenant();
  const { wellPlanId } = useCurrentWellPlan();
  const { invalidateWellCompletePlanCO2Cache } =
    useInvalidateWellCompletePlanCO2Cache();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);

  return useMutation<
    WellPlannerDetails,
    Error,
    {
      wellPlanPhaseId: number;
      emissionReductionInitiativesIds: number[];
    }
  >(
    async ({ wellPlanPhaseId, emissionReductionInitiativesIds }) => {
      const { data } =
        await TenantsService.tenantsWellsPlannersCompleteStepsEmpInitiativesUpdateUpdate(
          Number(tenantId),
          wellPlanPhaseId,
          Number(wellPlanId),
          {
            emission_reduction_initiatives: emissionReductionInitiativesIds,
          },
        );
      return data;
    },
    {
      onSuccess: async (data) => {
        setWellPlanData(data);
        notification.success({
          message: 'Updated phase',
          description: 'EMP initiatives have been updated.',
        });
        await invalidateWellCompletePlanCO2Cache(data.id);
      },
      onError: (error, { wellPlanPhaseId }) => {
        notification.error({
          message:
            'Unable to update EMP initiatives right now. Please try later.',
        });
        Logger.error(
          `Unable to update EMP initiatives for WellPlannerCompleteStep(id=${wellPlanPhaseId}).`,
          error,
        );
      },
    },
  );
};

export default useUpdateCompletePhaseEmissionReductionInitiatives;
