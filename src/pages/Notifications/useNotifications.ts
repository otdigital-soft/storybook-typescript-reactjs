import { useQuery } from 'react-query';
import notificationsServices from 'api/services/notifications';
import notificationsQueryKeys from 'api/queryKeys/notifications';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useNotifications = ({
  page,
  pageSize,
  enabled,
}: {
  page: number;
  pageSize: number;
  enabled?: boolean;
}) => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId
      ? notificationsQueryKeys.notifications(tenantId, page, pageSize)
      : [],
    tenantId
      ? () => notificationsServices.notifications(tenantId, page, pageSize)
      : noop,
    {
      enabled: !!tenantId && (enabled || enabled === undefined),
    },
  );
};

export default useNotifications;
