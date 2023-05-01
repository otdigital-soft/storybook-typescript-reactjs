import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import assetsQueryKeys from 'api/queryKeys/assets';

const useInvalidateBaselineCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  const invalidateBaselineCache = useCallback(
    async (assetId: number, baselineId: number) => {
      await queryClient.invalidateQueries(
        assetsQueryKeys.baseline({
          tenantId: Number(tenantId),
          assetId,
          baselineId,
        }),
      );
    },
    [tenantId, queryClient],
  );

  const invalidateBaselinePhasesCache = useCallback(
    async (assetId: number, baselineId: number) => {
      await queryClient.invalidateQueries(
        assetsQueryKeys.baselinePhases({
          tenantId: Number(tenantId),
          assetId,
          baselineId,
        }),
      );
    },
    [tenantId, queryClient],
  );

  const invalidateBaselineModesCache = useCallback(
    async (assetId: number, baselineId: number) => {
      await queryClient.invalidateQueries(
        assetsQueryKeys.baselineModes({
          tenantId: Number(tenantId),
          assetId,
          baselineId,
        }),
      );
    },
    [tenantId, queryClient],
  );

  return {
    invalidateBaselineCache,
    invalidateBaselinePhasesCache,
    invalidateBaselineModesCache,
  };
};

export default useInvalidateBaselineCache;
