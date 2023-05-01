import { Ordering } from 'utils/ordering';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import projectsQueryKeys from 'api/queryKeys/projects';
import projectsServices from 'api/services/projects';
import { noop } from 'utils/api';

const useProjectWells = (
  projectId: number,
  {
    draft,
    ordering,
  }: {
    ordering: Ordering;
    draft?: boolean;
  },
) => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId
      ? projectsQueryKeys.projectWells(tenantId, projectId, ordering, draft)
      : [],
    tenantId
      ? () =>
          projectsServices.projectWells(tenantId, projectId, ordering, draft)
      : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useProjectWells;
