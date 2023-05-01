import { Button, Result, Skeleton } from 'antd';
import Box, { Flexbox } from 'components/Box';
import Center from 'components/Center';
import Divider from 'components/Divider';
import ElementTag from 'components/ElementTag';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import JackupRigDetails from 'containers/JackupRigDetails';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import { parseISO } from 'date-fns';
import useBack from 'hooks/useBack';
import useCustomJackupRig from 'hooks/useCustomJackupRig';
import useDeleteProjectRig from 'hooks/useDeleteProjectRig';
import useProject from 'hooks/useProject';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import routes, { RigType } from 'routes';
import { isNotFoundError } from 'utils/api';
import { RigTypeEnum } from 'api/schema';

const ProjectJackupRig = () => {
  const { handleBack } = useBack();
  const navigate = useNavigate();
  const { rigId, projectId } =
    useParams<{ rigId: string; projectId: string }>();
  const {
    data: projectData,
    isLoading: isProjectDataLoading,
    error: projectError,
  } = useProject(Number(projectId));
  const {
    rigId: jackupRigId,
    data: jackupRigData,
    error: jackupRigError,
    isLoading: isJackupRigDataLoading,
  } = useCustomJackupRig(Number(rigId));
  const deleteProjectRig = useDeleteProjectRig();

  if (isNotFoundError(projectError) || isNotFoundError(jackupRigError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (projectError || jackupRigError) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load rig data" />
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
      path: generatePath(routes.projectRig, {
        projectId,
        rigType: RigType.Jackup,
        rigId: String(jackupRigId),
      }),
      breadcrumbName: jackupRigData?.name || '',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          title={
            isProjectDataLoading || isJackupRigDataLoading ? (
              <Box width={200}>
                <Skeleton title={true} paragraph={false} active />
              </Box>
            ) : (
              jackupRigData?.name
            )
          }
          subTitle={
            jackupRigData?.created_at ? (
              <ElementTag
                createdAt={parseISO(jackupRigData.created_at)}
                draft={jackupRigData.draft}
              />
            ) : null
          }
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={
            <Flexbox>
              <Flexbox gap={8}>
                <Button
                  type="primary"
                  onClick={() =>
                    navigate(
                      generatePath(routes.projectUpdateRig, {
                        projectId,
                        rigId: String(jackupRigId),
                        rigType: RigType.Jackup,
                      }),
                    )
                  }
                >
                  Edit rig
                </Button>
                <Button
                  type="primary"
                  onClick={() =>
                    deleteProjectRig({
                      projectId: Number(projectId),
                      rigId: Number(rigId),
                      rigType: RigTypeEnum.JACKUP,
                      rigName: jackupRigData?.name || '',
                    })
                  }
                  danger
                >
                  Delete rig
                </Button>
              </Flexbox>
              <Box marginLeft={8} marginRight={6}>
                <Divider type="vertical" height="100%" />
              </Box>
              <PageHeaderExtra />
            </Flexbox>
          }
        />
      </Header>
      <Content>
        <JackupRigDetails
          jackupRigData={jackupRigData}
          loading={isProjectDataLoading || isJackupRigDataLoading}
        />
      </Content>
    </>
  );
};

export default ProjectJackupRig;
