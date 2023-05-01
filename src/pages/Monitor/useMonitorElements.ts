import { useQuery } from 'react-query';
import monitorsServices, { MonitorElementType } from 'api/services/monitors';
import monitorsQueryKeys from 'api/queryKeys/monitors';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useMonitorElements = ({
  elementId,
  monitorId,
  type,
}: {
  monitorId: number;
  elementId: number;
  type: MonitorElementType;
}) => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId
      ? monitorsQueryKeys.monitorElements(tenantId, monitorId, elementId, type)
      : [],
    tenantId
      ? () =>
          monitorsServices.monitorElements(tenantId, monitorId, elementId, type)
      : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useMonitorElements;
