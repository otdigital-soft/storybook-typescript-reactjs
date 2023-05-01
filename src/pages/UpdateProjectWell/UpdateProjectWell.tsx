import { generatePath, useParams } from 'react-router-dom';
import useProject from 'hooks/useProject';
import useBack from 'hooks/useBack';
import routes from 'routes';
import { generateUpdateWellPath } from 'routes/utils';
import useCustomWell from 'hooks/useCustomWell';
import Center from 'components/Center';
import { Spin } from 'antd';
import { isNotFoundError } from 'utils/api';
import Result from 'components/Result';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import Box from 'components/Box';
import UpdateWellForm from 'containers/UpdateWellForm';
import useOnSuccessWellUpdate from 'pages/UpdateProjectWell/useOnSuccessWellUpdate';
import UpdateDraftWellForm from 'containers/UpdateDraftWellForm';

const UpdateProjectWell = () => {
  const { wellId, projectId } =
    useParams<{ wellId: string; projectId: string }>();
  const {
    data: projectData,
    isLoading: isLoadingProject,
    error: projectError,
  } = useProject(Number(projectId));
  const { handleBack } = useBack(routes.prepare);
  const {
    data: wellData,
    error: wellError,
    isLoading: isLoadingWell,
  } = useCustomWell(Number(wellId));
  const { onUpdate: onSuccessUpdate, onSave: onSuccessSave } =
    useOnSuccessWellUpdate(Number(projectId));

  if (isLoadingWell || isLoadingProject) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }

  if (isNotFoundError(wellError) || isNotFoundError(projectError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Well not found" />
      </Center>
    );
  }

  if (wellError || projectError || !wellData || !projectData) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load well data" />
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
      breadcrumbName: projectData.name,
    },
    {
      path: generateUpdateWellPath(Number(wellId), Number(projectId)),
      breadcrumbName: 'Edit well',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          title="Edit well"
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box marginTop={20} marginBottom={106} marginX={24}>
          {wellData.draft ? (
            <UpdateDraftWellForm
              wellData={wellData}
              onSuccessSave={onSuccessSave}
              onSuccessAdd={onSuccessUpdate}
            />
          ) : (
            <UpdateWellForm wellData={wellData} onSuccess={onSuccessUpdate} />
          )}
        </Box>
      </Content>
    </>
  );
};

export default UpdateProjectWell;
