import { useCallback } from 'react';
import wellsQueryKeys from 'api/queryKeys/wells';
import { CustomWellDetails } from 'api/schema';
import { useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';

const useUpdateWellDetailsCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  return useCallback(
    (data: CustomWellDetails) => {
      if (!tenantId) {
        throw new Error('Missing tenant id.');
      }

      const customWellQueryKey = wellsQueryKeys.customWell(tenantId, data.id);
      queryClient.setQueryData<CustomWellDetails>(customWellQueryKey, data);
    },
    [queryClient, tenantId],
  );
};

export default useUpdateWellDetailsCache;
