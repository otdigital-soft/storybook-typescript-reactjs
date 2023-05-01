import useBack from 'hooks/useBack';
import routes from 'routes';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import useProject from 'hooks/useProject';
import Center from 'components/Center';
import { Button, Spin } from 'antd';
import Result from 'components/Result';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import { Content, Header } from 'components/Layout';
import ElementTag from 'components/ElementTag';
import parseISO from 'date-fns/parseISO';
import Box from 'components/Box';
import Divider from 'components/Divider';
import ProjectInfo from './ProjectInfo';
import ProjectRigs from './ProjectRigs';
import ProjectWells from './ProjectWells';
import ProjectPlans from 'pages/Project/ProjectPlans';
import { useState } from 'react';
import Modal from 'components/Modal';
import ProjectDetails from 'pages/Project/ProjectDetails';
import useDeleteProject from 'pages/Project/useDeleteProject';
import { isNotFoundError } from 'utils/api';
import PageHeaderExtraActions from 'containers/PageHeaderExtraActions';

const Project = () => {
  const { handleBack } = useBack(routes.launch);
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: projectData,
    isLoading: isLoadingProject,
    error: projectError,
  } = useProject(Number(projectId));
  const [isProjectDetailsModalVisible, setIsProjectDetailsModalVisible] =
    useState(false);
  const onDeleteProject = useDeleteProject(
    Number(projectId),
    projectData?.name || '',
  );
  const breadcrumbRoutes = [
    {
      path: routes.prepare,
      breadcrumbName: 'Prepare',
    },
    {
      path: generatePath(routes.project, {
        projectId: String(projectId),
      }),
      breadcrumbName: 'Project details',
    },
  ];
  if (isLoadingProject) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }
  if (projectError) {
    return (
      <Center flexGrow={1}>
        {isNotFoundError(projectError) ? (
          <Result status="404" subTitle="Project doesn't exist." />
        ) : (
          <Result status="error" subTitle="Unable to load project right now." />
        )}
      </Center>
    );
  }

  return (
    <>
      <Header>
        <PageHeader
          title={projectData?.name}
          subTitle={
            projectData?.created_at ? (
              <ElementTag createdAt={parseISO(projectData.created_at)} />
            ) : null
          }
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={
            <PageHeaderExtraActions>
              <>
                <Button onClick={() => setIsProjectDetailsModalVisible(true)}>
                  Project details
                </Button>
                <Button
                  type="primary"
                  onClick={() =>
                    navigate(
                      generatePath(routes.updateProject, {
                        projectId: String(projectId),
                      }),
                    )
                  }
                >
                  Edit project
                </Button>
                <Button danger type="primary" onClick={onDeleteProject}>
                  Delete project
                </Button>
              </>
            </PageHeaderExtraActions>
          }
        />
      </Header>
      <Content>
        <Box marginX={24} marginY={20} overflowX="hidden">
          {projectData ? <ProjectInfo project={projectData} /> : null}
          <Divider />
          <ProjectRigs projectId={Number(projectId)} />
          <Box marginTop={20}>
            <ProjectWells projectId={Number(projectId)} />
          </Box>
          <Box marginTop={20}>
            <ProjectPlans projectId={Number(projectId)} />
          </Box>
        </Box>
      </Content>
      {projectData ? (
        <Modal
          title="Project details"
          centered
          visible={isProjectDetailsModalVisible}
          onOk={() => setIsProjectDetailsModalVisible(false)}
          onCancel={() => setIsProjectDetailsModalVisible(false)}
          width={1160}
        >
          <ProjectDetails project={projectData} />
        </Modal>
      ) : null}
    </>
  );
};

export default Project;
