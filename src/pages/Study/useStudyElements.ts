import { useQuery } from 'react-query';
import studiesServices from 'api/services/studies';
import studiesQueryKeys from 'api/queryKeys/studies';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useStudyElements = (projectId: number) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId ? studiesQueryKeys.studyElements(tenantId, projectId) : [],
    tenantId ? () => studiesServices.studyElements(tenantId, projectId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useStudyElements;
