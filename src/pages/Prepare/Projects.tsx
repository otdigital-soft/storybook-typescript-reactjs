import { Button, Col, Pagination, Result, Row } from 'antd';
import Box, { Flexbox } from 'components/Box';
import CardSkeleton from 'components/CardSkeleton';
import ElementCard from 'components/ElementCard';
import ElementTag from 'components/ElementTag';
import OrderingMenu from 'components/OrderingMenu';
import PageHeader from 'components/PageHeader';
import { AddPlaceholder } from 'components/Placeholder';
import { CARD_LIST_PAGE_SIZE } from 'consts';
import parseISO from 'date-fns/parseISO';
import useProjects from 'hooks/useProjects';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { Ordering, OrderingLabel } from 'utils/ordering';

const Projects = () => {
  const {
    data: projectsData,
    error: projectsError,
    isLoading: isLoadingProjects,
    ordering,
    changeOrdering,
    page,
    changePage,
  } = useProjects({
    initialPage: 1,
    initialPageSize: CARD_LIST_PAGE_SIZE,
    initialOrdering: Ordering.RecentlyAdded,
  });
  const navigate = useNavigate();
  const onCreateProjectClick = () => {
    navigate(routes.createProject);
  };
  const onCreateWellPlanClick = () => {
    navigate(routes.createWellPlan);
  };

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
                ellipsis={{
                  rows: 3,
                }}
                height={213}
                onClick={() =>
                  navigate(
                    generatePath(routes.project, {
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
      <Row gutter={24}>
        <Col span={6}>
          <AddPlaceholder
            title="Create new project"
            onClick={onCreateProjectClick}
            height={209}
          />
        </Col>
        <Col span={6}>
          <AddPlaceholder
            title="Create new well plan"
            onClick={onCreateWellPlanClick}
            height={209}
          />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <PageHeader
        pX={0}
        title={projectsData ? `Projects (${projectsData.count})` : 'Projects'}
        subTitle={OrderingLabel[ordering]}
        extra={
          <Flexbox gap={8}>
            <OrderingMenu value={ordering} onChange={changeOrdering} />
            <Button type="primary" onClick={onCreateWellPlanClick}>
              Create new well plan
            </Button>
            <Button type="primary" onClick={onCreateProjectClick}>
              Create new project
            </Button>
          </Flexbox>
        }
      />
      <Box marginTop={20}>{content}</Box>
    </>
  );
};

export default Projects;
