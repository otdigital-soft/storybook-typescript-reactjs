import notificationsServices from 'api/services/notifications';
import { useMutation, useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';
import notificationsQueryKeys from 'api/queryKeys/notifications';
import Logger from 'utils/logger';

const useReadNotification = () => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();

  return useMutation<void, Error, number>(
    (notificationId) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return notificationsServices.readNotification(tenantId, notificationId);
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
      onError: (e, notificationId) => {
        Logger.error(
          `Unable to mark Notification(id=${notificationId}) as read`,
          e,
        );
      },
    },
  );
};

export default useReadNotification;
