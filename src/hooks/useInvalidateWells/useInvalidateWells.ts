import { useCallback } from 'react';
import projectsQueryKeys from 'api/queryKeys/projects';
import wellsQueryKeys from 'api/queryKeys/wells';
import { useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';

const useInvalidateWells = () => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  return useCallback(async () => {
    if (!tenantId) {
      throw new Error('Missing tenant id');
    }

    await Promise.all([
      queryClient.invalidateQueries(projectsQueryKeys.allElements(tenantId)),
      queryClient.invalidateQueries(wellsQueryKeys.allCustomWells(tenantId)),
    ]);
  }, [queryClient, tenantId]);
};

export default useInvalidateWells;
