import { notification } from 'antd';
import {
  TenantsService,
  WellPlannerDetails,
  WellPlannerDetailsCompleteStep,
} from 'api/schema';
import useTenant from 'hooks/useTenant';
import useInvalidateWellCompletePlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellCompletePlanCO2Cache';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';

const useDuplicateCompletePhase = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const { invalidateWellCompletePlanCO2Cache } =
    useInvalidateWellCompletePlanCO2Cache();

  const {
    mutate: onDuplicateCompletePhase,
    isLoading: isDuplicatingCompletePhase,
  } = useMutation<WellPlannerDetails, Error, WellPlannerDetailsCompleteStep>(
    async (completeStep) => {
      const { data } =
        await TenantsService.tenantsWellsPlannersCompleteStepsDuplicateCreate(
          Number(tenantId),
          completeStep.id,
          wellPlanId,
        );
      return data;
    },
    {
      onSuccess: async (wellPlanData, completeStep) => {
        notification.success({
          message: 'Duplicated phase',
          description: (
            <>
              Phase <strong>{completeStep.phase.name}</strong> has been
              duplicated.
            </>
          ),
        });

        setWellPlanData(wellPlanData);
        await invalidateWellCompletePlanCO2Cache(wellPlanId);
      },
      onError: (error, data) => {
        const { nonFieldErrors } = apiValidationErrors(
          error,
          'Phase cannot be duplicate right now. Please try later.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        Logger.error(
          `Unable to duplicate a WellPlannerCompleteStep(id=${data.id}).`,
          error,
          data,
        );
      },
    },
  );

  return {
    onDuplicateCompletePhase,
    isDuplicatingCompletePhase,
  };
};

export default useDuplicateCompletePhase;
