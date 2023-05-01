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
import useProjects from 'hooks/useProjects';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { Ordering, OrderingLabel } from 'utils/ordering';

const breadcrumbRoutes: Route[] = [
  {
    path: routes.studies,
    breadcrumbName: 'Benchmark',
  },
];

const Studies = () => {
  const {
    data: projectsData,
    error: projectsError,
    isLoading: isLoadingProjects,
    page,
    changePage,
    ordering,
    changeOrdering,
  } = useProjects({
    initialPage: 1,
    initialPageSize: CARD_LIST_PAGE_SIZE,
    initialOrdering: Ordering.RecentlyAdded,
  });
  const navigate = useNavigate();

  let content;
  if (projectsError) {
    content = <Result status="error" subTitle="Unable to load projects" />;
  } else if (isLoadingProjects) {
    content = (
      <CardSkeleton
        gutter={[24, 18]}
        span={6}
        numElements={CARD_LIST_PAGE_SIZE}
      />
    );
  } else if (projectsData?.results?.length) {
    content = (
      <>
        <Row gutter={[24, 18]}>
          {projectsData.results.map((project) => (
            <Col span={6} key={project.id}>
              <ElementCard
                title={project.name}
                description={project.description}
                updatedAt={parseISO(project.updated_at)}
                height={213}
                ellipsis={{
                  rows: 3,
                }}
                onClick={() =>
                  navigate(
                    generatePath(routes.study, {
                      projectId: String(project.id),
                    }),
                  )
                }
                tag={<ElementTag createdAt={parseISO(project.created_at)} />}
              />
            </Col>
          ))}
        </Row>
        <Flexbox marginTop={41} justifyContent="flex-end">
          <Pagination
            current={page}
            pageSize={CARD_LIST_PAGE_SIZE}
            hideOnSinglePage
            total={projectsData.count}
            onChange={changePage}
            showSizeChanger={false}
          />
        </Flexbox>
      </>
    );
  } else if (projectsData) {
    content = (
      <Empty
        description="Project list is empty."
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    );
  }

  return (
    <>
      <Header>
        <PageHeader
          title="Benchmarking overview"
          breadcrumb={{ routes: breadcrumbRoutes }}
          extra={<PageHeaderExtra />}
        />
      </Header>

      <Content>
        <Box marginTop={20}>
          <PageHeader
            title={
              projectsData ? `Projects (${projectsData.count})` : 'Projects'
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

export default Studies;
