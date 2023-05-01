import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import assetsQueryKeys from 'api/queryKeys/assets';
import { useQueryClient } from 'react-query';

const useInvalidateAssetCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useCallback(
    (assetId: number) => {
      queryClient.invalidateQueries(
        assetsQueryKeys.asset(Number(tenantId), assetId),
      );
    },
    [queryClient, tenantId],
  );
};

export default useInvalidateAssetCache;
