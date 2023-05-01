import routes from 'routes';
import { generatePath, useParams } from 'react-router-dom';
import useProject from 'hooks/useProject';
import useBack from 'hooks/useBack';
import Center from 'components/Center';
import { Button, Spin } from 'antd';
import Result from 'components/Result';
import useProjectWells from 'hooks/useProjectWells';
import { Ordering } from 'utils/ordering';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import { Formik } from 'formik';
import { SubmitRow } from 'components/Row';
import PlanForm from 'containers/PlanForm';
import useCreatePlan from 'pages/CreatePlan/useCreatePlan';
import Box from 'components/Box';
import { isNotFoundError } from 'utils/api';
import useProjectRigs from 'pages/Project/useProjectRigs';

const CreatePlan = () => {
  const { handleBack } = useBack(routes.launch);
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: projectData,
    isLoading: isLoadingProject,
    error: projectError,
  } = useProject(Number(projectId));
  const {
    data: projectWellsData,
    error: projectWellsError,
    isLoading: isLoadingProjectWells,
  } = useProjectWells(Number(projectId), {
    ordering: Ordering.RecentlyAdded,
    draft: false,
  });
  const {
    data: projectRigsData,
    error: projectRigsError,
    isLoading: isLoadingProjectRigs,
  } = useProjectRigs({
    projectId: Number(projectId),
    ordering: Ordering.Alphabetically,
    draft: false,
    studiable: true,
  });
  const {
    schema,
    initialValues,
    mutation: { mutateAsync: onCreatePlan },
  } = useCreatePlan({
    projectId: Number(projectId),
    projectWells: projectWellsData || [],
    projectRigs: projectRigsData || [],
  });
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
      path: generatePath(routes.createPlan, {
        projectId: String(projectId),
      }),
      breadcrumbName: 'Create new plan',
    },
  ];

  if (isLoadingProject || isLoadingProjectWells || isLoadingProjectRigs) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }
  if (projectError || projectWellsError || projectRigsError) {
    return (
      <Center flexGrow={1}>
        {isNotFoundError(projectError) ? (
          <Result status="404" subTitle="Project doesn't exist." />
        ) : (
          <Result status="error" subTitle="Unable to create plan right now." />
        )}
      </Center>
    );
  }

  return (
    <>
      <Header>
        <PageHeader
          title="Create new plan"
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
          <Formik
            initialValues={initialValues}
            onSubmit={(values, formikHelpers) =>
              onCreatePlan({ values, formikHelpers })
            }
            validationSchema={schema}
            enableReinitialize
            validateOnChange={false}
          >
            {({ submitForm, isSubmitting, isValid }) => (
              <PlanForm>
                <SubmitRow>
                  <>
                    <Button onClick={handleBack}>Cancel</Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={submitForm}
                      disabled={isSubmitting || !isValid}
                    >
                      Save
                    </Button>
                  </>
                </SubmitRow>
              </PlanForm>
            )}
          </Formik>
        </Box>
      </Content>
    </>
  );
};

export default CreatePlan;
