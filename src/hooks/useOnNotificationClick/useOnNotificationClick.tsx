import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import useReadNotification from 'hooks/useReadNotification';
import { NotificationList } from 'api/schema';

const useOnNotificationClick = () => {
  const navigate = useNavigate();
  const { mutate: onReadNotification } = useReadNotification();
  return useCallback(
    (notification: NotificationList) => {
      if (!notification.read) {
        onReadNotification(notification.id);
      }

      navigate(notification.url);
    },
    [navigate, onReadNotification],
  );
};

export default useOnNotificationClick;
