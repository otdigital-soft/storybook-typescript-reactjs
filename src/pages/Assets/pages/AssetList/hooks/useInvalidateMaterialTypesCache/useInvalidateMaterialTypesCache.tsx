import assetsQueryKeys from 'api/queryKeys/assets';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

const useInvalidateMaterialTypesCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries(
      assetsQueryKeys.materialTypesAll(Number(tenantId)),
    );
  }, [queryClient, tenantId]);
};

export default useInvalidateMaterialTypesCache;
