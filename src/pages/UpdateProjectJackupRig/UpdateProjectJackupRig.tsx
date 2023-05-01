import { Spin } from 'antd';
import Box from 'components/Box';
import Center from 'components/Center';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import UpdateJackupDraftForm from '../../containers/UpdateJackupDraftForm';
import useBack from 'hooks/useBack';
import routes from 'routes';
import { RigType } from 'routes';
import useProject from 'hooks/useProject';
import { generatePath, useParams } from 'react-router-dom';
import Result from 'components/Result';
import useCustomJackupRig from 'hooks/useCustomJackupRig/useCustomJackupRig';
import UpdateJackupForm from 'containers/UpdateJackupForm';
import { isNotFoundError } from 'utils/api';

const UpdateProjectJackupRig = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: projectData,
    isLoading: isProjectDataLoading,
    error: projectError,
  } = useProject(Number(projectId));
  const { handleBack } = useBack(routes.prepare);
  const { rigId } = useParams<{ rigId: string }>();
  const {
    rigId: jackupRigId,
    data: jackupRigData,
    isLoading: isJackupRigDataLoading,
    error: jackupRigError,
  } = useCustomJackupRig(Number(rigId));

  if (isJackupRigDataLoading || isProjectDataLoading) {
    return (
      <Center flexGrow={1}>
        <Spin />
      </Center>
    );
  }

  if (isNotFoundError(projectError) || isNotFoundError(jackupRigError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (projectError || jackupRigError || !jackupRigData) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load rig" />
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
      path: generatePath(routes.projectUpdateRig, {
        projectId,
        rigId: String(jackupRigId),
        rigType: RigType.Jackup,
      }),
      breadcrumbName: 'Edit rig',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          onBack={handleBack}
          title="Edit rig"
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box paddingTop={20}>
          {jackupRigData?.draft ? (
            <UpdateJackupDraftForm jackupRigData={jackupRigData} />
          ) : (
            <UpdateJackupForm jackupRigData={jackupRigData} />
          )}
        </Box>
      </Content>
    </>
  );
};

export default UpdateProjectJackupRig;
