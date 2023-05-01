import Box, { Flexbox } from 'components/Box';
import {
  NotificationBellOutlined,
  NotificationDot,
  Menu,
  MenuItem,
} from 'containers/NotificationMenu/NotificationMenu.styled';
import { Dropdown, Spin } from 'antd';
import useNotifications from 'pages/Notifications/useNotifications';
import { useNavigate } from 'react-router-dom';
import { Text } from 'components/Typography';
import formatDistance from 'date-fns/formatDistance';
import parseISO from 'date-fns/parseISO';
import useOnNotificationClick from 'hooks/useOnNotificationClick';
import useUnreadNotifications from 'containers/NotificationMenu/useUnreadNotifications';
import { useState } from 'react';
import { useTheme } from 'styled-components';
import routes from 'routes';

const NotificationMenu = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const onSeeAll = () => {
    navigate(routes.notifications);
    setVisible(false);
  };
  const {
    data: notificationsData,
    error: notificationsError,
    isLoading: isLoadingNotifications,
  } = useNotifications({
    page: 1,
    pageSize: 3,
    enabled: visible,
  });
  const { data: unreadNotifications } = useUnreadNotifications();
  const onNotificationClick = useOnNotificationClick();
  let menu;
  if (isLoadingNotifications) {
    menu = (
      <Menu>
        <MenuItem key="header" disabled>
          Notifications
        </MenuItem>
        <MenuItem key="loading" disabled>
          <Flexbox justifyContent="center">
            <Spin size="small" />
          </Flexbox>
        </MenuItem>
      </Menu>
    );
  } else if (notificationsError) {
    menu = (
      <Menu>
        <MenuItem key="header" disabled>
          Notifications
        </MenuItem>
        <MenuItem key="error" disabled>
          Unable to load notifications
        </MenuItem>
      </Menu>
    );
  } else if (notificationsData?.results?.length) {
    menu = (
      <Menu>
        <MenuItem key="header" disabled>
          Notifications
        </MenuItem>
        {notificationsData.results.map((notification) => (
          <MenuItem
            onClick={() => onNotificationClick(notification)}
            title={notification.title}
            key={notification.id}
          >
            <Box width="100%">
              <Text strong={!notification.read} ellipsis>
                {notification.title}
              </Text>
            </Box>
            <Box>
              <Text fontSize={12}>
                {formatDistance(parseISO(notification.created_at), new Date(), {
                  addSuffix: true,
                })}
              </Text>
            </Box>
          </MenuItem>
        ))}
        <Menu.Divider />
        <MenuItem onClick={onSeeAll} key="see-all">
          <Flexbox
            justifyContent="center"
            width="100%"
            paddingTop={10}
            paddingBottom={10}
          >
            <strong>See all</strong>
          </Flexbox>
        </MenuItem>
      </Menu>
    );
  } else {
    menu = (
      <Menu>
        <MenuItem key="header" disabled>
          Notifications
        </MenuItem>
        <MenuItem key="empty" disabled>
          No result
        </MenuItem>
      </Menu>
    );
  }

  return (
    <Dropdown
      overlay={menu}
      trigger={['click']}
      visible={visible}
      placement="topRight"
      onVisibleChange={(newVisible) => setVisible(newVisible)}
    >
      <Flexbox position="relative" style={{ cursor: 'pointer' }}>
        {unreadNotifications?.count ? (
          <Box top="2px" right="2px" position="absolute">
            <NotificationDot />
          </Box>
        ) : null}
        <NotificationBellOutlined
          title="Notifications"
          color={
            visible && unreadNotifications?.count
              ? colors.red[6]
              : colors.text.primary
          }
        />
      </Flexbox>
    </Dropdown>
  );
};

export default NotificationMenu;
