import { useQuery } from 'react-query';
import monitorsQueryKeys from 'api/queryKeys/monitors';
import monitorsServices from 'api/services/monitors';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useMonitor = (monitorId: number) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId ? monitorsQueryKeys.monitor(tenantId, monitorId) : [],
    tenantId ? () => monitorsServices.monitor(tenantId, monitorId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useMonitor;
