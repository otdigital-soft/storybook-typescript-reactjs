import { useQuery } from 'react-query';
import projectsQueryKeys from 'api/queryKeys/projects';
import projectsServices from 'api/services/projects';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const usePlan = (projectId: number, planId: number) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId ? projectsQueryKeys.plan(tenantId, projectId, planId) : [],
    tenantId ? () => projectsServices.plan(tenantId, projectId, planId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default usePlan;
