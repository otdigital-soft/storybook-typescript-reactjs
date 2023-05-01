import { Spin } from 'antd';
import Box from 'components/Box';
import Center from 'components/Center';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import routes from 'routes';
import useProject from 'hooks/useProject';
import Result from 'components/Result';
import CreateRigForm, { CreateRigFormProvider } from 'containers/CreateRigForm';

const AddProjectRig = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: projectData,
    error: projectError,
    isLoading: isProjectDataLoading,
  } = useProject(Number(projectId));

  if (isProjectDataLoading) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }

  if (projectError) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load project" />
      </Center>
    );
  }

  const breadcrumbRoutes = [
    {
      path: routes.prepare,
      breadcrumbName: 'Prepare',
    },
    {
      path: generatePath(routes.project, { projectId }),
      breadcrumbName: projectData?.name || '',
    },
    {
      path: generatePath(routes.projectCreateRig, { projectId }),
      breadcrumbName: 'Add Rig',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          onBack={() => navigate(generatePath(routes.project, { projectId }))}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          title={`Add rig to ${projectData?.name}`}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box paddingTop={20}>
          <CreateRigFormProvider>
            <CreateRigForm />
          </CreateRigFormProvider>
        </Box>
      </Content>
    </>
  );
};

export default AddProjectRig;
