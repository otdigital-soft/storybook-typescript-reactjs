import { Col, Empty, Pagination, Row } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import Box, { Flexbox } from 'components/Box';
import CardSkeleton from 'components/CardSkeleton';
import ElementCard from 'components/ElementCard';
import ElementTag from 'components/ElementTag';
import { Content, Header } from 'components/Layout';
import OrderingMenu from 'components/OrderingMenu';
import PageHeader from 'components/PageHeader';
import Result from 'components/Result';
import { CARD_LIST_PAGE_SIZE } from 'consts';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import parseISO from 'date-fns/parseISO';
import useMonitors from 'hooks/useMonitors';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { Ordering, OrderingLabel } from 'utils/ordering';

const breadcrumbRoutes: Route[] = [
  {
    path: routes.monitors,
    breadcrumbName: 'Monitor',
  },
];

const Monitors = () => {
  const {
    data: monitorsData,
    error: monitorsError,
    isLoading: isLoadingMonitors,
    page,
    changePage,
    ordering,
    changeOrdering,
  } = useMonitors({
    initialPage: 1,
    initialPageSize: CARD_LIST_PAGE_SIZE,
    initialOrdering: Ordering.RecentlyAdded,
  });
  const navigate = useNavigate();

  let content;
  if (monitorsError) {
    content = <Result status="error" subTitle="Unable to load monitors" />;
  } else if (isLoadingMonitors) {
    content = (
      <CardSkeleton
        gutter={[24, 18]}
        span={6}
        numElements={CARD_LIST_PAGE_SIZE}
      />
    );
  } else if (monitorsData?.results?.length) {
    content = (
      <>
        <Row gutter={[24, 18]}>
          {monitorsData.results.map((monitor) => (
            <Col span={6} key={monitor.id}>
              <ElementCard
                title={monitor.name}
                description={monitor.description}
                updatedAt={parseISO(monitor.updated_at)}
                height={213}
                ellipsis={{
                  rows: 3,
                }}
                onClick={() =>
                  navigate(
                    generatePath(routes.monitor, {
                      monitorId: String(monitor.id),
                    }),
                  )
                }
                tag={<ElementTag createdAt={parseISO(monitor.created_at)} />}
              />
            </Col>
          ))}
        </Row>
        <Flexbox marginTop={41} justifyContent="flex-end">
          <Pagination
            current={page}
            pageSize={CARD_LIST_PAGE_SIZE}
            hideOnSinglePage
            total={monitorsData.count}
            onChange={changePage}
            showSizeChanger={false}
          />
        </Flexbox>
      </>
    );
  } else if (monitorsData) {
    content = (
      <Empty
        description="Monitor list is empty."
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <>
      <Header>
        <PageHeader
          title="CO2 monitor list"
          breadcrumb={{ routes: breadcrumbRoutes }}
          extra={<PageHeaderExtra />}
        />
      </Header>

      <Content>
        <Box marginTop={20}>
          <PageHeader
            title={
              monitorsData ? `Monitors (${monitorsData.count})` : 'Monitors'
            }
            subTitle={OrderingLabel[ordering]}
            extra={<OrderingMenu value={ordering} onChange={changeOrdering} />}
          />
          <Box margin={24}>{content}</Box>
        </Box>
      </Content>
    </>
  );
};

export default Monitors;
