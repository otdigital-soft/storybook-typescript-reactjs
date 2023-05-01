import { useQuery } from 'react-query';
import projectsQueryKeys from 'api/queryKeys/projects';
import projectsServices from 'api/services/projects';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useProject = (projectId: number) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId ? projectsQueryKeys.project(tenantId, projectId) : [],
    tenantId ? () => projectsServices.project(tenantId, projectId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useProject;
