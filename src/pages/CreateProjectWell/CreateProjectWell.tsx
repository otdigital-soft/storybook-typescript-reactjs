import { generatePath, useParams } from 'react-router-dom';
import useProject from 'hooks/useProject';
import Center from 'components/Center';
import { Spin } from 'antd';
import Result from 'components/Result';
import routes from 'routes';
import { generateCreateWellPath } from 'routes/utils';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import Box from 'components/Box';
import useBack from 'hooks/useBack';
import CreateWellForm, {
  CreateWellFormProvider,
} from 'containers/CreateWellForm';
import useOnCreateWellSuccess from 'pages/CreateProjectWell/useOnCreateWellSuccess';

const CreateProjectWell = () => {
  const { handleBack } = useBack(routes.launch);
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: projectData,
    error: projectError,
    isLoading: isLoadingProject,
  } = useProject(Number(projectId));
  const onCreateWellSuccess = useOnCreateWellSuccess(Number(projectId));

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
      path: generatePath(routes.project, { projectId: String(projectId) }),
      breadcrumbName: projectData?.name || '',
    },
    {
      path: generateCreateWellPath(Number(projectId)),
      breadcrumbName: 'Add well',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          title={`Add well to ${projectData?.name}`}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box marginX={24} marginTop={20} marginBottom={106}>
          <CreateWellFormProvider
            projectId={Number(projectId)}
            onSuccess={onCreateWellSuccess}
          >
            <CreateWellForm />
          </CreateWellFormProvider>
        </Box>
      </Content>
    </>
  );
};

export default CreateProjectWell;
