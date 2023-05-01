import { useMutation, useQueryClient } from 'react-query';
import {
  CurrentStepEnum,
  TenantsService,
  WellPlannerDetails,
} from 'api/schema';
import wellsQueryKeys from 'api/queryKeys/wells';
import { WellPlanStep } from 'pages/WellPlan/consts';
import Logger from 'utils/logger';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useTenant from 'hooks/useTenant';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { notification } from 'antd';

const useCompletePlannedPlan = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const { wellPlanId } = useCurrentWellPlan();
  const navigate = useNavigate();
  return useMutation<WellPlannerDetails, Error, void>(
    async () => {
      const { data } =
        await TenantsService.tenantsWellsPlannersPlannedCompleteCreate(
          Number(tenantId),
          wellPlanId,
        );

      return {
        ...data,
        current_step: CurrentStepEnum.WELL_REVIEWING,
      };
    },
    {
      onSuccess: async (data) => {
        notification.success({
          message: 'Plan has been completed',
        });
        const wellPlanQueryKey = wellsQueryKeys.wellPlan(
          Number(tenantId),
          wellPlanId,
        );
        queryClient.setQueryData<WellPlannerDetails>(wellPlanQueryKey, data);
        navigate(
          generatePath(routes.updateWellPlanStep, {
            wellPlanId: String(data.id),
            stepId: WellPlanStep.Complete,
          }),
        );
      },
      onError: (error) => {
        notification.error({
          message: 'Plan cannot be completed right now',
        });

        Logger.error(
          `Unable to complete planned plan for WellPlanner(id=${wellPlanId}).`,
          error,
        );
      },
    },
  );
};

export default useCompletePlannedPlan;
