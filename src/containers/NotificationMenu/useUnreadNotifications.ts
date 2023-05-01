import { useQuery } from 'react-query';
import notificationsServices from 'api/services/notifications';
import notificationsQueryKeys from 'api/queryKeys/notifications';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useUnreadNotifications = () => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId ? notificationsQueryKeys.unreadNotifications(tenantId) : [],
    tenantId ? () => notificationsServices.unreadNotifications(tenantId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useUnreadNotifications;
