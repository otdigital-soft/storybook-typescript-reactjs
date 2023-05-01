import useTenant from 'hooks/useTenant';
import { useQueryClient } from 'react-query';
import { useCallback } from 'react';
import assetsQueryKeys from 'api/queryKeys/assets';
import { AssetDetails } from 'api/schema';
import useInvalidateAssetsCache from 'pages/Assets/hooks/useInvalidateAssetsCache';

const useUpdateAssetDetailsCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const invalidateAssetsCache = useInvalidateAssetsCache();

  return useCallback(
    async (assetId: number, data: AssetDetails) => {
      await invalidateAssetsCache();
      const assetQueryKey = assetsQueryKeys.asset(Number(tenantId), assetId);
      return queryClient.setQueryData<AssetDetails>(assetQueryKey, data);
    },
    [invalidateAssetsCache, queryClient, tenantId],
  );
};

export default useUpdateAssetDetailsCache;
