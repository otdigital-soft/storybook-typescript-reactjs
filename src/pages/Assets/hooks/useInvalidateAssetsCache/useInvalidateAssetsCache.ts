import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import assetsQueryKeys from 'api/queryKeys/assets';
import { useQueryClient } from 'react-query';

const useInvalidateAssetsCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries(assetsQueryKeys.allAssets(Number(tenantId)));
  }, [queryClient, tenantId]);
};

export default useInvalidateAssetsCache;
