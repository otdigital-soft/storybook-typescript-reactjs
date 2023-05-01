import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import assetsQueryKeys from 'api/queryKeys/assets';
import { useQueryClient } from 'react-query';

const useInvalidateEmissionManagementPlanCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useCallback(
    ({
      assetId,
      baselineId,
      emissionManagementPlanId,
    }: {
      assetId: number;
      baselineId: number;
      emissionManagementPlanId: number;
    }) => {
      queryClient.invalidateQueries(
        assetsQueryKeys.emissionManagementPlan({
          tenantId: Number(tenantId),
          assetId,
          baselineId,
          emissionManagementPlanId,
        }),
      );
    },
    [queryClient, tenantId],
  );
};

export default useInvalidateEmissionManagementPlanCache;
