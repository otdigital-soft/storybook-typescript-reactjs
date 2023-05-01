import { generatePath, useNavigate, useParams } from 'react-router-dom';
import useCustomWell from 'hooks/useCustomWell';
import useProject from 'hooks/useProject';
import useBack from 'hooks/useBack';
import routes from 'routes';
import { generateUpdateWellPath, generateWellPath } from 'routes/utils';
import { isNotFoundError } from 'utils/api';
import Center from 'components/Center';
import { Button, Skeleton } from 'antd';
import Result from 'components/Result';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import ElementTag from 'components/ElementTag';
import { parseISO } from 'date-fns';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtraActions from 'containers/PageHeaderExtraActions';
import Box from 'components/Box';
import WellDetails from 'containers/WellDetails';
import useDeleteWell from 'pages/ProjectWell/useDeleteWell';

const ProjectWell = () => {
  const { wellId, projectId } =
    useParams<{ wellId: string; projectId: string }>();
  const {
    data: wellData,
    error: wellError,
    isLoading: isLoadingWell,
  } = useCustomWell(Number(wellId));
  const {
    data: projectData,
    error: projectError,
    isLoading: isLoadingProject,
  } = useProject(Number(projectId));
  const isLoading = isLoadingWell || isLoadingProject;
  const { handleBack } = useBack(routes.launch);
  const navigate = useNavigate();
  const onDeleteWell = useDeleteWell(wellData, Number(projectId));

  if (isNotFoundError(wellError) || isNotFoundError(projectError)) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Well not found" />
      </Center>
    );
  }

  if (wellError || projectError) {
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
      path: generatePath(routes.project, {
        projectId: String(projectId),
      }),
      breadcrumbName: projectData?.name || '',
    },
    {
      path: generateWellPath(Number(wellId), Number(projectId)),
      breadcrumbName: wellData?.name || '',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          title={
            isLoading ? (
              <Box width={200}>
                <Skeleton title={true} paragraph={false} active />
              </Box>
            ) : (
              wellData?.name
            )
          }
          subTitle={
            wellData ? (
              <ElementTag
                createdAt={parseISO(wellData.created_at)}
                draft={wellData.draft}
              />
            ) : null
          }
          onBack={handleBack}
          breadcrumb={
            wellData && projectData
              ? {
                  routes: breadcrumbRoutes,
                  itemRender: defaultBreadcrumbItemRender,
                }
              : undefined
          }
          extra={
            wellData && projectData ? (
              <PageHeaderExtraActions>
                <>
                  <Button
                    type="primary"
                    onClick={() =>
                      navigate(
                        generateUpdateWellPath(
                          Number(wellId),
                          Number(projectId),
                        ),
                      )
                    }
                  >
                    Edit well
                  </Button>
                  <Button type="primary" danger onClick={onDeleteWell}>
                    Delete well
                  </Button>
                </>
              </PageHeaderExtraActions>
            ) : undefined
          }
        />
      </Header>
      <Content>
        <Box marginY={20} marginX={24}>
          <WellDetails data={wellData} loading={isLoading} />
        </Box>
      </Content>
    </>
  );
};

export default ProjectWell;
