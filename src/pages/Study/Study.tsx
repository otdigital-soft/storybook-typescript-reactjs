import { Button, Spin } from 'antd';
import Box, { Flexbox } from 'components/Box';
import Center from 'components/Center';
import ElementTag from 'components/ElementTag';
import { Content, Header } from 'components/Layout';
import LayoutSwitch from 'components/LayoutSwitch';
import LayoutSwitchProvider from 'components/LayoutSwitch/LayoutSwitchProvider';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import Result from 'components/Result';
import PageHeaderExtraActions from 'containers/PageHeaderExtraActions';
import parseISO from 'date-fns/parseISO';
import useBack from 'hooks/useBack';
import ProjectInfo from 'pages/Study/ProjectInfo';
import StudyActions from 'pages/Study/StudyActions';
import StudyCharts from 'pages/Study/StudyCharts';
import StudyReportProvider from 'pages/Study/StudyReportProvider';
import useStudy from 'pages/Study/useStudy';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import routes from 'routes';

const Study = () => {
  const navigate = useNavigate();
  const { handleBack } = useBack(routes.launch);
  const { projectId } = useParams<{ projectId: string }>();
  const {
    studyError,
    isLoadingStudy,
    projectPlansData,
    projectData,
    studyNotFoundError,
    projectRigsData,
    studyElementsData,
  } = useStudy(Number(projectId));

  if (isLoadingStudy) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }
  if (studyNotFoundError) {
    return (
      <Center flexGrow={1}>
        <Result status="404" subTitle="Project doesn't exist." />
      </Center>
    );
  }
  if (
    studyError ||
    !projectData ||
    !projectPlansData ||
    !projectRigsData ||
    !studyElementsData
  ) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load project right now." />
      </Center>
    );
  }

  const breadcrumbRoutes = [
    {
      path: routes.studies,
      breadcrumbName: 'Benchmark',
    },
    {
      path: generatePath(routes.study, {
        projectId: String(projectId),
      }),
      breadcrumbName: projectData.name,
    },
  ];

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
                <Button
                  type="primary"
                  onClick={() =>
                    navigate(
                      generatePath(routes.project, {
                        projectId: String(projectId),
                      }),
                    )
                  }
                >
                  Go to project
                </Button>
              </>
            </PageHeaderExtraActions>
          }
        />
      </Header>
      <Content>
        <Box marginX={24} marginTop={20} marginBottom={106}>
          <LayoutSwitchProvider storageKeyName="studyLayoutType">
            <StudyReportProvider
              projectName={projectData.name}
              elements={studyElementsData}
            >
              <>
                <ProjectInfo
                  project={projectData}
                  rigs={projectRigsData}
                  plans={projectPlansData}
                />

                <Box marginY={20}>
                  <Flexbox justifyContent="flex-end">
                    <LayoutSwitch />
                  </Flexbox>
                </Box>

                <StudyCharts elements={studyElementsData} />

                <StudyActions />

                <Box id="chart-export" visibility="hidden" />
              </>
            </StudyReportProvider>
          </LayoutSwitchProvider>
        </Box>
      </Content>
    </>
  );
};

export default Study;
