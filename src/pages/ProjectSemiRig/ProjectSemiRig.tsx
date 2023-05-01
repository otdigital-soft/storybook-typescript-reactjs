import { Button, Result, Skeleton } from 'antd';
import Box, { Flexbox } from 'components/Box';
import Center from 'components/Center';
import Divider from 'components/Divider';
import ElementTag from 'components/ElementTag';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';

import PageHeaderExtra from 'containers/PageHeaderExtra';
import SemiRigDetails from 'containers/SemiRigDetails';
import { parseISO } from 'date-fns';
import useBack from 'hooks/useBack';
import useCustomSemiRig from 'hooks/useCustomSemiRig';
import useDeleteProjectRig from 'hooks/useDeleteProjectRig';
import useProject from 'hooks/useProject';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import routes from 'routes';
import { RigType } from 'routes';
import { isNotFoundError } from 'utils/api';
import { RigTypeEnum } from 'api/schema';

const ProjectSemiRig = () => {
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
    data: semiRigData,
    error: semiRigError,
    isLoading: isSemiRigDataLoading,
  } = useCustomSemiRig(Number(rigId));
  const deleteProjectRig = useDeleteProjectRig();

  if (isNotFoundError(projectError) || isNotFoundError(semiRigError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Rig not found" />
      </Center>
    );
  }

  if (projectError || semiRigError) {
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
          title={
            isSemiRigDataLoading || isProjectDataLoading ? (
              <Box width={200}>
                <Skeleton title={true} paragraph={false} active />
              </Box>
            ) : (
              semiRigData?.name
            )
          }
          subTitle={
            semiRigData?.created_at ? (
              <ElementTag
                createdAt={parseISO(semiRigData.created_at)}
                draft={semiRigData.draft}
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
                        rigId,
                        rigType: RigType.Semi,
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
                      rigType: RigTypeEnum.SEMI,
                      rigName: semiRigData?.name || '',
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
        <SemiRigDetails
          semiRigData={semiRigData}
          loading={isSemiRigDataLoading || isProjectDataLoading}
        />
      </Content>
    </>
  );
};

export default ProjectSemiRig;
