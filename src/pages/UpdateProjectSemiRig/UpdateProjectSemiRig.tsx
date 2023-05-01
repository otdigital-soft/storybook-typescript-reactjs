import { Spin } from 'antd';
import Box from 'components/Box';
import Center from 'components/Center';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import useBack from 'hooks/useBack';
import routes from 'routes';
import { RigType } from 'routes';
import useProject from 'hooks/useProject';
import { generatePath, useParams } from 'react-router-dom';
import Result from 'components/Result';
import useCustomSemiRig from 'hooks/useCustomSemiRig/useCustomSemiRig';
import UpdateSemiForm from 'containers/UpdateSemiForm';
import { isNotFoundError } from 'utils/api';
import UpdateSemiDraftForm from 'containers/UpdateSemiDraftForm';

const UpdateProjectSemiRig = () => {
  const { rigId, projectId } =
    useParams<{ rigId: string; projectId: string }>();
  const {
    data: projectData,
    isLoading: isProjectDataLoading,
    error: projectError,
  } = useProject(Number(projectId));
  const { handleBack } = useBack(routes.prepare);
  const {
    data: semiRigData,
    isLoading: isSemiRigDataLoading,
    error: semiRigError,
  } = useCustomSemiRig(Number(rigId));

  if (isSemiRigDataLoading || isProjectDataLoading) {
    return (
      <Center flexGrow={1}>
        <Spin />
      </Center>
    );
  }

  if (isNotFoundError(projectError) || isNotFoundError(semiRigError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (semiRigError || projectError || !semiRigData) {
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
        rigId,
        rigType: RigType.Semi,
      }),
      breadcrumbName: semiRigData?.name || '',
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
          {semiRigData?.draft ? (
            <UpdateSemiDraftForm semiRigData={semiRigData} />
          ) : (
            <UpdateSemiForm semiRigData={semiRigData} />
          )}
        </Box>
      </Content>
    </>
  );
};

export default UpdateProjectSemiRig;
