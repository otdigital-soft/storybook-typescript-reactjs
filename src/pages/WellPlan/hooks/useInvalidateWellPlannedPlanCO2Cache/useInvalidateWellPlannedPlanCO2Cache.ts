import wellsQueryKeys from 'api/queryKeys/wells';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

const useInvalidateWellPlannedPlanCO2Cache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const invalidateWellPlannedPlanCO2Cache = useCallback(
    async (wellPlanId: number) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      await Promise.all([
        queryClient.invalidateQueries(
          wellsQueryKeys.wellPlannedPlanSummary(tenantId, wellPlanId),
        ),
        queryClient.invalidateQueries(
          wellsQueryKeys.allWellPlannedPlanCO2({ tenantId, wellPlanId }),
        ),
        queryClient.invalidateQueries(
          wellsQueryKeys.allWellPlannedPlanSavedCO2({ tenantId, wellPlanId }),
        ),
      ]);
    },
    [queryClient, tenantId],
  );
  const invalidateWellPlannedStepCO2Cache = useCallback(
    async (wellPlanId: number, wellPlanStepId: number) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      await queryClient.invalidateQueries(
        wellsQueryKeys.wellPlannedStepCO2(tenantId, wellPlanId, wellPlanStepId),
      );
    },
    [queryClient, tenantId],
  );
  const invalidateWellPlannedStepsCO2Cache = useCallback(
    async (wellPlanId: number) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      await queryClient.invalidateQueries(
        wellsQueryKeys.wellPlannedStepsCO2(tenantId, wellPlanId),
      );
    },
    [queryClient, tenantId],
  );

  return {
    invalidateWellPlannedPlanCO2Cache,
    invalidateWellPlannedStepCO2Cache,
    invalidateWellPlannedStepsCO2Cache,
  };
};

export default useInvalidateWellPlannedPlanCO2Cache;
