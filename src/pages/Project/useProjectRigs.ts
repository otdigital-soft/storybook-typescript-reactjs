import { Ordering } from 'utils/ordering';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import projectsQueryKeys from 'api/queryKeys/projects';
import projectsServices from 'api/services/projects';
import { noop } from 'utils/api';

const useProjectRigs = ({
  projectId,
  ordering,
  draft,
  studiable,
}: {
  projectId: number;
  ordering?: Ordering;
  draft?: boolean;
  studiable?: boolean;
}) => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId
      ? projectsQueryKeys.projectRigs({
          tenantId,
          projectId,
          ordering,
          draft,
          studiable,
        })
      : [],
    tenantId
      ? () =>
          projectsServices.projectRigs({
            tenantId,
            projectId,
            ordering,
            draft,
            studiable,
          })
      : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useProjectRigs;
