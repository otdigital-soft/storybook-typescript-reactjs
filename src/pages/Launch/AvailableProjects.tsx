import { DeploymentUnitOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import Box, { Flexbox } from 'components/Box';
import CardSkeleton from 'components/CardSkeleton';
import ElementCard from 'components/ElementCard';
import OrderingMenu from 'components/OrderingMenu';
import PageHeader from 'components/PageHeader';
import { AddPlaceholder, EmptyPlaceholder } from 'components/Placeholder';
import parseISO from 'date-fns/parseISO';
import useProjects from 'hooks/useProjects';
import {
  ContentContainer,
  Separator,
  SeparatorContainer,
} from 'pages/Launch/Launch.styled';
import { PrepareTab } from 'pages/Prepare/Prepare';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useTheme } from 'styled-components';
import { Ordering, OrderingLabel } from 'utils/ordering';

const AvailableProjects = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const onSeeAll = () => {
    navigate(
      generatePath(routes.prepareTab, {
        tabId: PrepareTab.Projects,
      }),
    );
  };
  const onAddProject = () => {
    navigate(routes.createProject);
  };

  const {
    ordering,
    changeOrdering,
    data: projectsData,
    error: projectsError,
    isLoading: isLoadingProjects,
  } = useProjects({
    initialPage: 1,
    initialPageSize: 2,
    initialOrdering: Ordering.RecentlyAdded,
  });
  let content = null;
  if (projectsError) {
    content = (
      <EmptyPlaceholder title="Unable to load projects" padding="28px" />
    );
  } else if (isLoadingProjects) {
    content = <CardSkeleton gutter={71} span={8} numElements={3} />;
  } else if (projectsData?.results?.length) {
    const span = projectsData?.results.length === 1 ? 12 : 8;
    const gutter = projectsData?.results.length === 1 ? 40 : 71;

    content = (
      <Row gutter={gutter}>
        {projectsData?.results.map((project) => (
          <Col span={span} key={project.id}>
            <ElementCard
              title={project.name}
              description={project.description}
              icon={
                <DeploymentUnitOutlined
                  style={{ color: colors.purple['11'] }}
                />
              }
              cardColor={colors.purple[11]}
              onClick={() =>
                navigate(
                  generatePath(routes.project, {
                    projectId: String(project.id),
                  }),
                )
              }
              updatedAt={parseISO(project.updated_at)}
              height="100%"
              ellipsis={{
                rows: 3,
              }}
            />
          </Col>
        ))}
        <Col span={span}>
          <AddPlaceholder
            title="Create new project"
            onClick={onAddProject}
            height="100%"
            maxWidth={400}
          />
        </Col>
      </Row>
    );
  } else if (projectsData) {
    content = (
      <AddPlaceholder
        title="Create new project"
        height="209px"
        onClick={onAddProject}
        maxWidth={400}
      />
    );
  }

  return (
    <Box marginTop={15}>
      <PageHeader
        title="Projects"
        subTitle={OrderingLabel[ordering]}
        extra={
          <Flexbox gap="8px">
            <OrderingMenu value={ordering} onChange={changeOrdering} />
            <Button type="primary" onClick={onSeeAll}>
              View all
            </Button>
          </Flexbox>
        }
      />
      <ContentContainer>{content}</ContentContainer>
      <SeparatorContainer>
        <Separator />
      </SeparatorContainer>
    </Box>
  );
};

export default AvailableProjects;
