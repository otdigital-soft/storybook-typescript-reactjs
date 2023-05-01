import { useMemo } from 'react';
import assetsQueryKeys from 'api/queryKeys/assets';
import useListCache from 'hooks/useListCache';
import { AssetPhase } from 'api/schema';
import useTenant from 'hooks/useTenant';

const usePhasesCache = (assetId: number) => {
  const { tenantId } = useTenant();
  const cacheKey = useMemo(
    () => assetsQueryKeys.phases(Number(tenantId), assetId),
    [assetId, tenantId],
  );

  return useListCache<AssetPhase>(cacheKey);
};

export default usePhasesCache;
