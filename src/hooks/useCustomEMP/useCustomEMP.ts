import { useQuery } from 'react-query';
import projectsQueryKeys from 'api/queryKeys/projects';
import projectsServices from 'api/services/projects';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import { RigType } from 'routes';

const useCustomEMP = ({
  projectId,
  rigId,
  rigType,
}: {
  projectId: number;
  rigId: number;
  rigType: RigType;
}) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId
      ? projectsQueryKeys.emp({ tenantId, projectId, rigId, rigType })
      : [],
    tenantId
      ? () => projectsServices.emp({ tenantId, projectId, rigId, rigType })
      : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useCustomEMP;
