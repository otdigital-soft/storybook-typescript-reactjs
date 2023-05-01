import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import assetsQueryKeys from 'api/queryKeys/assets';
import { useQueryClient } from 'react-query';

const useInvalidateVesselTypesCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useCallback(() => {
    queryClient.invalidateQueries(
      assetsQueryKeys.allVesselTypes(Number(tenantId)),
    );
  }, [queryClient, tenantId]);
};

export default useInvalidateVesselTypesCache;
