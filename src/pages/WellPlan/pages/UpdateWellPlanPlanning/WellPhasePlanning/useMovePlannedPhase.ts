import { DropResult } from 'react-beautiful-dnd';
import { reorder } from 'utils/reorder';
import { useMutation, useQueryClient } from 'react-query';
import { TenantsService, WellPlannerDetails } from 'api/schema';
import Logger from 'utils/logger';
import useTenant from 'hooks/useTenant';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import useWellPlan from 'pages/WellPlan/hooks/useWellPlan';
import { useCallback } from 'react';
import wellsQueryKeys from 'api/queryKeys/wells';

const useMovePlannedPhase = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { setWellPlanData, invalidateWellPlanQueries, cancelWellPlanQueries } =
    useWellPlanCache(wellPlanId);
  const { data: wellPlanData } = useWellPlan(wellPlanId);
  const queryClient = useQueryClient();

  const movePlannedPhaseMutation = useMutation<
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
        await TenantsService.tenantsWellsPlannersPlannedStepsMoveUpdate(
          tenantId,
          wellPlanId,
          Number(result.draggableId),
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
          const plannedSteps = wellPlanData.planned_steps;
          const items = reorder(
            plannedSteps,
            result.source.index,
            result.destination.index,
          );
          setWellPlanData({
            ...wellPlanData,
            planned_steps: items,
          });
        }

        return { wellPlanOldData: wellPlanData };
      },
      onSuccess: async (data) => {
        setWellPlanData(data);
        if (tenantId) {
          await queryClient.invalidateQueries(
            wellsQueryKeys.allWellPlannedPlanCO2({ tenantId, wellPlanId }),
          );
        }
      },
      onError: async (error, _, context) => {
        if (context?.wellPlanOldData) {
          setWellPlanData(context.wellPlanOldData);
        }
        await invalidateWellPlanQueries();
        Logger.error(
          `Unable to move planned phase for WellPlanner(id=${wellPlanId})`,
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
      return movePlannedPhaseMutation.mutate(result);
    },
    [movePlannedPhaseMutation],
  );
};

export default useMovePlannedPhase;
