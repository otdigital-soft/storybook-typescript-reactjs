import { useCallback } from 'react';
import rigsQueryKeys from 'api/queryKeys/rigs';
import projectsQueryKeys from 'api/queryKeys/projects';
import studiesQueryKeys from 'api/queryKeys/studies';
import { useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';

const useInvalidateRigCache = (projectId: number | undefined) => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  return useCallback(async () => {
    if (!tenantId) {
      throw new Error('Missing tenant id');
    }

    await queryClient.invalidateQueries(rigsQueryKeys.allCustomRigs(tenantId));

    if (projectId) {
      await queryClient.invalidateQueries(
        projectsQueryKeys.allProjectRigs(tenantId, Number(projectId)),
      );
      await queryClient.invalidateQueries(
        studiesQueryKeys.studyElements(tenantId, Number(projectId)),
      );
    }
  }, [projectId, queryClient, tenantId]);
};

export default useInvalidateRigCache;
