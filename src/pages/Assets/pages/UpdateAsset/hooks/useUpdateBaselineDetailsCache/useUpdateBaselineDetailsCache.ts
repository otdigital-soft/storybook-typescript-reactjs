import useTenant from 'hooks/useTenant';
import { useQueryClient } from 'react-query';
import { useCallback } from 'react';
import assetsQueryKeys from 'api/queryKeys/assets';
import { BaselineDetails } from 'api/schema';
import useInvalidateAssetCache from 'pages/Assets/pages/UpdateAsset/hooks/useInvalidateAssetCache';
import useInvalidateBaselineCache from 'hooks/useInvalidateBaselineCache';
import useInvalidateAllEmissionManagementPlansCache from '../useInvalidateAllEmissionManagementPlansCache';

const useUpdateBaselineDetailsCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const invalidateAssetCache = useInvalidateAssetCache();
  const { invalidateBaselineModesCache, invalidateBaselinePhasesCache } =
    useInvalidateBaselineCache();
  const invalidateAllEmissionManagementPlansCache =
    useInvalidateAllEmissionManagementPlansCache();

  return useCallback(
    async (assetId: number, data: BaselineDetails) => {
      invalidateAssetCache(assetId);
      invalidateBaselinePhasesCache(assetId, data.id);
      invalidateBaselineModesCache(assetId, data.id);
      invalidateAllEmissionManagementPlansCache(assetId, data.id);

      const cacheKey = assetsQueryKeys.baseline({
        tenantId: Number(tenantId),
        assetId,
        baselineId: data.id,
      });

      return queryClient.setQueryData<BaselineDetails>(cacheKey, data);
    },
    [
      invalidateAssetCache,
      invalidateAllEmissionManagementPlansCache,
      invalidateBaselinePhasesCache,
      invalidateBaselineModesCache,
      queryClient,
      tenantId,
    ],
  );
};

export default useUpdateBaselineDetailsCache;
