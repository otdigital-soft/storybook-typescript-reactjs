import notificationsServices from 'api/services/notifications';
import { useMutation, useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';
import notificationsQueryKeys from 'api/queryKeys/notifications';
import { notification } from 'antd';
import Logger from 'utils/logger';

const useReadNotifications = () => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();

  return useMutation<void>(
    () => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return notificationsServices.readNotifications(tenantId);
    },
    {
      onSuccess: async () => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        await queryClient.invalidateQueries(
          notificationsQueryKeys.allNotifications(tenantId),
        );
      },
      onError: (e) => {
        notification.error({
          message: 'Unable to mark notifications as read',
        });
        Logger.error('Unable to mark notifications as read', e);
      },
    },
  );
};

export default useReadNotifications;
