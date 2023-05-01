import { useCallback } from 'react';
import projectsQueryKeys from 'api/queryKeys/projects';
import { useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';
import useInvalidateWells from 'hooks/useInvalidateWells';

const useInvalidateProjectWells = (projectId: number) => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  const invalidateWells = useInvalidateWells();
  return useCallback(async () => {
    if (!tenantId) {
      throw new Error('Missing tenant id');
    }

    await Promise.all([
      invalidateWells(),
      queryClient.invalidateQueries(
        projectsQueryKeys.allProjectWells(tenantId, projectId),
      ),
      queryClient.invalidateQueries(
        projectsQueryKeys.allPlans(tenantId, projectId),
      ),
    ]);
  }, [invalidateWells, projectId, queryClient, tenantId]);
};

export default useInvalidateProjectWells;
