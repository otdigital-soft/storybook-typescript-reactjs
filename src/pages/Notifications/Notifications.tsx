import PageHeader from 'components/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import { Content, Header } from 'components/Layout';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import useBack from 'hooks/useBack';
import Box, { Flexbox } from 'components/Box';
import { Button, List } from 'antd';
import { Text, Title } from 'components/Typography';
import parseISO from 'date-fns/parseISO';
import formatDistance from 'date-fns/formatDistance';
import Pagination from 'components/Pagination';
import useNotifications from 'pages/Notifications/useNotifications';
import { useState } from 'react';
import useReadNotifications from 'pages/Notifications/useReadNotifications';
import useOnNotificationClick from 'hooks/useOnNotificationClick';
import Result from 'components/Result';
import routes from 'routes';
import { NOTIFICATION_LIST_PAGE_SIZE } from 'consts';

const breadcrumbRoutes = [
  {
    path: routes.launch,
    breadcrumbName: 'Launch',
  },
  {
    path: routes.notifications,
    breadcrumbName: 'Notifications',
  },
];

const Notifications = () => {
  const [page, setPage] = useState(1);
  const {
    data: notificationsData,
    error: notificationsError,
    isLoading: isLoadingNotifications,
  } = useNotifications({
    page,
    pageSize: NOTIFICATION_LIST_PAGE_SIZE,
  });
  const { mutate: onReadNotifications, isLoading: isReadingNotifications } =
    useReadNotifications();
  const onNotificationClick = useOnNotificationClick();
  const { handleBack } = useBack(routes.launch);
  return (
    <>
      <Header>
        <PageHeader
          title="Notifications"
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box marginTop={20} marginBottom={20} marginLeft={24} marginRight={24}>
          {notificationsError ? (
            <Result status="error" subTitle="Unable to load notifications" />
          ) : (
            <>
              <List
                loading={isLoadingNotifications}
                size="large"
                header={
                  <Flexbox alignItems="center">
                    <Box flexGrow={1}>
                      <Text>News</Text>
                    </Box>
                    <Box flexShrink={0}>
                      <Button
                        type="link"
                        onClick={() => onReadNotifications()}
                        disabled={isReadingNotifications}
                      >
                        <Title level={5}>Set all as read</Title>
                      </Button>
                    </Box>
                  </Flexbox>
                }
                bordered
                dataSource={notificationsData?.results || []}
                renderItem={(item) => (
                  <List.Item
                    extra={
                      <Button
                        type="link"
                        onClick={() => onNotificationClick(item)}
                      >
                        <Title color="purple.7" level={5}>
                          Details
                        </Title>
                      </Button>
                    }
                  >
                    <Flexbox flexDirection="column" width="100%">
                      <Text strong={!item.read}>{item.title}</Text>
                      <Text type="secondary">
                        {formatDistance(parseISO(item.created_at), new Date(), {
                          addSuffix: true,
                        })}
                      </Text>
                    </Flexbox>
                  </List.Item>
                )}
              />
              <Flexbox marginTop={41} justifyContent="flex-end">
                <Pagination
                  current={page}
                  pageSize={NOTIFICATION_LIST_PAGE_SIZE}
                  hideOnSinglePage
                  total={notificationsData?.count}
                  onChange={setPage}
                  showSizeChanger={false}
                />
              </Flexbox>
            </>
          )}
        </Box>
      </Content>
    </>
  );
};

export default Notifications;
