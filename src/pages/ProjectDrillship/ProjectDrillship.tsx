import { generatePath, useNavigate, useParams } from 'react-router-dom';
import useBack from 'hooks/useBack';
import useProject from 'hooks/useProject';
import useCustomDrillship from 'hooks/useCustomDrillship';
import { isNotFoundError } from 'utils/api';
import Center from 'components/Center';
import { Button, Result, Skeleton } from 'antd';
import routes, { RigType } from 'routes';
import { generateRigPath, generateUpdateRigPath } from 'routes/utils';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import Box, { Flexbox } from 'components/Box';
import ElementTag from 'components/ElementTag';
import { parseISO } from 'date-fns';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import Divider from 'components/Divider';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import DrillshipDetails from 'containers/DrillshipDetails';
import { RigTypeEnum } from 'api/schema';
import useDeleteProjectRig from 'hooks/useDeleteProjectRig';

const ProjectDrillship = () => {
  const { rigId, projectId } =
    useParams<{ rigId: string; projectId: string }>();
  const { handleBack } = useBack();
  const navigate = useNavigate();
  const {
    data: projectData,
    isLoading: isProjectDataLoading,
    error: projectError,
  } = useProject(Number(projectId));
  const {
    data: drillshipData,
    error: drillshipError,
    isLoading: isLoadingDrillship,
  } = useCustomDrillship(Number(rigId));
  const deleteProjectRig = useDeleteProjectRig();

  if (isNotFoundError(projectError) || isNotFoundError(drillshipError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (projectError || drillshipError) {
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
      path: generateRigPath(
        Number(rigId),
        RigType.Drillship,
        Number(projectId),
      ),
      breadcrumbName: drillshipData?.name || '',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          title={
            isLoadingDrillship || isProjectDataLoading ? (
              <Box width={200}>
                <Skeleton title={true} paragraph={false} active />
              </Box>
            ) : (
              drillshipData?.name
            )
          }
          subTitle={
            drillshipData?.created_at ? (
              <ElementTag
                createdAt={parseISO(drillshipData.created_at)}
                draft={drillshipData.draft}
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
                      generateUpdateRigPath(
                        Number(rigId),
                        RigType.Drillship,
                        Number(projectId),
                      ),
                    )
                  }
                >
                  Edit rig
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() =>
                    deleteProjectRig({
                      projectId: Number(projectId),
                      rigId: Number(rigId),
                      rigType: RigTypeEnum.DRILLSHIP,
                      rigName: drillshipData?.name || '',
                    })
                  }
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
        <DrillshipDetails
          drillshipData={drillshipData}
          loading={isLoadingDrillship || isProjectDataLoading}
        />
      </Content>
    </>
  );
};

export default ProjectDrillship;
