import assetsQueryKeys from 'api/queryKeys/assets';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

const useInvalidateHelicopterTypesCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries(
      assetsQueryKeys.allHelicopterTypes(Number(tenantId)),
    );
  }, [queryClient, tenantId]);
};

export default useInvalidateHelicopterTypesCache;
