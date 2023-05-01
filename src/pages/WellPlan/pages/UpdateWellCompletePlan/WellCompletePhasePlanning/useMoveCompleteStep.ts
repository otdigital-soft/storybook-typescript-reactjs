import { DropResult } from 'react-beautiful-dnd';
import { reorder } from 'utils/reorder';
import { useMutation } from 'react-query';
import { TenantsService, WellPlannerDetails } from 'api/schema';
import Logger from 'utils/logger';
import useTenant from 'hooks/useTenant';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import useWellPlan from 'pages/WellPlan/hooks/useWellPlan';
import { useCallback } from 'react';

const useMoveCompleteStep = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { setWellPlanData, invalidateWellPlanQueries, cancelWellPlanQueries } =
    useWellPlanCache(wellPlanId);
  const { data: wellPlanData } = useWellPlan(wellPlanId);

  const moveCompleteStepMutation = useMutation<
    WellPlannerDetails,
    Error,
    DropResult,
    { wellPlanOldData: WellPlannerDetails | undefined }
  >(
    async (result) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      if (!result.destination) {
        throw new Error('Missing destination');
      }

      const { data } =
        await TenantsService.tenantsWellsPlannersCompleteStepsMoveUpdate(
          tenantId,
          Number(result.draggableId),
          wellPlanId,
          {
            order: result.destination.index,
          },
        );

      return data;
    },
    {
      onMutate: async (result) => {
        if (!result.destination) {
          return;
        }

        await cancelWellPlanQueries();

        if (wellPlanData) {
          const completeSteps = wellPlanData.complete_steps;
          const items = reorder(
            completeSteps,
            result.source.index,
            result.destination.index,
          );
          setWellPlanData({
            ...wellPlanData,
            complete_steps: items,
          });
        }

        return { wellPlanOldData: wellPlanData };
      },
      onSuccess: async (data) => {
        setWellPlanData(data);
      },
      onError: async (error, _, context) => {
        if (context?.wellPlanOldData) {
          setWellPlanData(context.wellPlanOldData);
        }
        await invalidateWellPlanQueries();
        Logger.error(
          `Unable to move complete phase for WellPlanner(id=${wellPlanId})`,
          error,
        );
      },
    },
  );

  return useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }
      if (result.source.index === result.destination.index) {
        return;
      }
      return moveCompleteStepMutation.mutate(result);
    },
    [moveCompleteStepMutation],
  );
};

export default useMoveCompleteStep;
