import { useMemo } from 'react';
import assetsQueryKeys from 'api/queryKeys/assets';
import useListCache from 'hooks/useListCache';
import { AssetMode } from 'api/schema';
import useTenant from 'hooks/useTenant';

const useModesCache = (assetId: number) => {
  const { tenantId } = useTenant();
  const cacheKey = useMemo(
    () => assetsQueryKeys.modes(Number(tenantId), assetId),
    [assetId, tenantId],
  );

  return useListCache<AssetMode>(cacheKey);
};

export default useModesCache;
