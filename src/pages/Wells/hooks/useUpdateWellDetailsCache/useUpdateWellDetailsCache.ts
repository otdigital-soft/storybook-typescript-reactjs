import useTenant from 'hooks/useTenant';
import { useQueryClient } from 'react-query';
import { useCallback } from 'react';
import { WellPlannerDetails } from 'api/schema';
import wellsQueryKeys from 'api/queryKeys/wells';
import useInvalidateWellsCache from 'pages/Wells/pages/WellList/hooks/useInvalidateWellsCache';

const useUpdateWellDetailsCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const invalidateWellsCache = useInvalidateWellsCache();

  return useCallback(
    async (wellPlanId: number, data: WellPlannerDetails) => {
      await Promise.all([
        invalidateWellsCache(),
        queryClient.invalidateQueries(
          wellsQueryKeys.phases(Number(tenantId), wellPlanId),
        ),
        queryClient.invalidateQueries(
          wellsQueryKeys.modes(Number(tenantId), wellPlanId),
        ),
      ]);
      const wellPlanQueryKey = wellsQueryKeys.wellPlan(
        Number(tenantId),
        data.id,
      );
      queryClient.setQueryData<WellPlannerDetails>(wellPlanQueryKey, data);
      return;
    },
    [invalidateWellsCache, queryClient, tenantId],
  );
};

export default useUpdateWellDetailsCache;
