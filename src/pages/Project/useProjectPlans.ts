import { Ordering } from 'utils/ordering';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import projectsQueryKeys from 'api/queryKeys/projects';
import projectsServices from 'api/services/projects';
import { noop } from 'utils/api';

const useProjectPlans = ({
  projectId,
  ordering,
  draft,
}: {
  projectId: number;
  ordering?: Ordering;
  draft?: boolean;
}) => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId
      ? projectsQueryKeys.plans({ tenantId, projectId, ordering, draft })
      : [],
    tenantId
      ? () => projectsServices.plans({ tenantId, projectId, ordering, draft })
      : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useProjectPlans;
