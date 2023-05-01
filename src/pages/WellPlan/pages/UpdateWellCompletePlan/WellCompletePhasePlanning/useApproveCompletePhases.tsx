import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { notification } from 'antd';
import { TenantsService, WellPlannerDetails } from 'api/schema';
import Logger from 'utils/logger';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';

const useApproveCompletePhases = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);

  const { mutate: onApprovePhases, isLoading: isApprovingPhases } = useMutation<
    WellPlannerDetails,
    Error,
    { phases: number[]; onSuccess?: () => void }
  >(
    async ({ phases }) => {
      const { data } =
        await TenantsService.tenantsWellsPlannersCompleteStepsApproveUpdate(
          Number(tenantId),
          wellPlanId,
          {
            complete_steps: phases,
          },
        );

      return data;
    },
    {
      onSuccess: async (wellPlanData, { phases, onSuccess }) => {
        notification.success({
          message: `Approved ${phases.length > 1 ? 'phases' : 'phase'}`,
        });

        setWellPlanData(wellPlanData);

        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error, { phases }) => {
        notification.error({
          message: `${
            phases.length > 1 ? 'Phases' : 'Phase'
          } cannot be approved right now. Please try later.`,
        });
        Logger.error(
          `Unable to approve complete steps for WellPlanner(id=${wellPlanId}).`,
          error,
          {
            phases,
          },
        );
      },
    },
  );

  return {
    onApprovePhases,
    isApprovingPhases,
  };
};

export default useApproveCompletePhases;
