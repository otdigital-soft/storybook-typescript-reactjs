import wellsQueryKeys from 'api/queryKeys/wells';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

const useInvalidateWellCompletePlanCO2Cache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return {
    invalidateWellCompletePlanCO2Cache: useCallback(
      async (wellPlanId: number) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        await Promise.all([
          queryClient.invalidateQueries(
            wellsQueryKeys.wellCompletePlanSummary(tenantId, wellPlanId),
          ),
          queryClient.invalidateQueries(
            wellsQueryKeys.allWellCompletePlanCO2({ tenantId, wellPlanId }),
          ),
          queryClient.invalidateQueries(
            wellsQueryKeys.allWellMeasuredAirTemperature({
              tenantId,
              wellPlanId,
            }),
          ),
          queryClient.invalidateQueries(
            wellsQueryKeys.allWellMeasuredWaveHeave({ tenantId, wellPlanId }),
          ),
          queryClient.invalidateQueries(
            wellsQueryKeys.allWellMeasuredWindSpeed({ tenantId, wellPlanId }),
          ),
        ]);
      },
      [queryClient, tenantId],
    ),
    invalidateWellCompletePlanCO2CacheWithoutMeasurements: useCallback(
      async (wellPlanId: number) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        await Promise.all([
          queryClient.invalidateQueries(
            wellsQueryKeys.wellCompletePlanSummary(tenantId, wellPlanId),
          ),
          queryClient.invalidateQueries(
            wellsQueryKeys.allWellCompletePlanCO2({ tenantId, wellPlanId }),
          ),
        ]);
      },
      [queryClient, tenantId],
    ),
  };
};

export default useInvalidateWellCompletePlanCO2Cache;
