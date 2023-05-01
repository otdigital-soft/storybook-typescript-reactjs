import { useQuery } from 'react-query';
import studiesQueryKeys from 'api/queryKeys/studies';
import studiesServices from 'api/services/studies';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useStudyMetrics = () => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId ? studiesQueryKeys.studyMetrics(tenantId) : [],
    tenantId ? () => studiesServices.studyMetrics(tenantId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useStudyMetrics;
