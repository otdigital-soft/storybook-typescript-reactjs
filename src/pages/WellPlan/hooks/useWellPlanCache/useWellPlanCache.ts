import wellsQueryKeys from 'api/queryKeys/wells';
import useTenant from 'hooks/useTenant';
import { useCallback, useMemo } from 'react';
import { WellPlannerDetails } from 'api/schema';
import { useQueryClient } from 'react-query';

const useWellPlanCache = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  const wellPlanQueryKey = useMemo(
    () => wellsQueryKeys.wellPlan(Number(tenantId), wellPlanId),
    [tenantId, wellPlanId],
  );

  const setWellPlanData = useCallback(
    (data: WellPlannerDetails) => {
      return queryClient.setQueryData<WellPlannerDetails>(
        wellPlanQueryKey,
        data,
      );
    },
    [queryClient, wellPlanQueryKey],
  );

  const invalidateWellPlanQueries = useCallback(() => {
    return queryClient.invalidateQueries(wellPlanQueryKey);
  }, [queryClient, wellPlanQueryKey]);

  const cancelWellPlanQueries = useCallback(() => {
    return queryClient.cancelQueries(wellPlanQueryKey);
  }, [queryClient, wellPlanQueryKey]);

  return {
    wellPlanQueryKey,
    setWellPlanData,
    cancelWellPlanQueries,
    invalidateWellPlanQueries,
  };
};

export default useWellPlanCache;
