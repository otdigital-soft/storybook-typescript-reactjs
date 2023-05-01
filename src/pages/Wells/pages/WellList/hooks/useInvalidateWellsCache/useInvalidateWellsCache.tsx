import wellsQueryKeys from 'api/queryKeys/wells';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useQueryClient } from 'react-query';

const useInvalidateWellsCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useCallback(
    async () =>
      queryClient.invalidateQueries(
        wellsQueryKeys.allWellPlans(Number(tenantId)),
      ),
    [queryClient, tenantId],
  );
};

export default useInvalidateWellsCache;
