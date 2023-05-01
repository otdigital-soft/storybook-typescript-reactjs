import { Button, Col, Result, Row } from 'antd';
import Box, { Flexbox } from 'components/Box';
import CardSkeleton from 'components/CardSkeleton';
import ElementCard from 'components/ElementCard';
import ElementTag from 'components/ElementTag';
import PageHeader from 'components/PageHeader';
import { AddPlaceholder } from 'components/Placeholder';
import parseISO from 'date-fns/parseISO';
import useProjects from 'hooks/useProjects';
import { PrepareTab } from 'pages/Prepare/Prepare';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { Ordering } from 'utils/ordering';

const AllProjects = () => {
  const navigate = useNavigate();
  const {
    data: projectsData,
    error: projectsError,
    isLoading: isLoadingProjects,
  } = useProjects({
    initialPage: 1,
    initialPageSize: 4,
    initialOrdering: Ordering.RecentlyAdded,
  });
  const onCreateProjectClick = () => {
    navigate(routes.createProject);
  };

  let content = null;
  if (projectsError) {
    content = <Result status="error" subTitle="Unable to load projects" />;
  } else if (isLoadingProjects) {
    content = <CardSkeleton gutter={24} span={6} numElements={4} />;
  } else if (projectsData?.results?.length) {
    content = (
      <Row gutter={24}>
        {projectsData?.results.map((project) => (
          <Col span={6} key={project.id}>
            <ElementCard
              title={project.name}
              description={project.description}
              onClick={() =>
                navigate(
                  generatePath(routes.project, {
                    projectId: String(project.id),
                  }),
                )
              }
              updatedAt={parseISO(project.updated_at)}
              height="100%"
              tag={<ElementTag createdAt={parseISO(project.created_at)} />}
              ellipsis={{
                rows: 3,
              }}
            />
          </Col>
        ))}
      </Row>
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
      </Row>
    );
  }
  return (
    <>
      <PageHeader
        pX={0}
        title={projectsData ? `Projects (${projectsData.count})` : 'Projects'}
        subTitle="Recently added"
        extra={
          <Flexbox gap={8}>
            <Button
              type="default"
              onClick={() =>
                navigate(
                  generatePath(routes.prepareTab, {
                    tabId: PrepareTab.Projects,
                  }),
                )
              }
            >
              View all projects
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

export default AllProjects;
