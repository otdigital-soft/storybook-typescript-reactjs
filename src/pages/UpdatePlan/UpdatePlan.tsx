import routes from 'routes';
import { generatePath, useParams } from 'react-router-dom';
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
import Box from 'components/Box';
import { isNotFoundError } from 'utils/api';
import usePlan from './usePlan';
import useUpdatePlan from 'pages/UpdatePlan/useUpdatePlan';
import useProjectRigs from 'pages/Project/useProjectRigs';

const UpdatePlan = () => {
  const { handleBack } = useBack(routes.launch);
  const { projectId } = useParams<{ projectId: string }>();
  const { planId } = useParams<{ planId: string }>();
  const {
    data: planData,
    isLoading: isLoadingPlan,
    error: planError,
  } = usePlan(Number(projectId), Number(planId));
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
    mutation: { mutateAsync: onUpdatePlan },
    onClear: onClearPlan,
  } = useUpdatePlan({
    projectId: Number(projectId),
    planId: Number(planId),
    projectWells: projectWellsData,
    projectRigs: projectRigsData,
    plan: planData,
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
      breadcrumbName: planData?.name || '',
    },
    {
      path: generatePath(routes.updatePlan, {
        projectId: String(projectId),
        planId: String(planId),
      }),
      breadcrumbName: 'Edit plan',
    },
  ];

  if (isLoadingPlan || isLoadingProjectWells || isLoadingProjectRigs) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }
  if (planError || projectWellsError || projectRigsError) {
    return (
      <Center flexGrow={1}>
        {isNotFoundError(planError) ? (
          <Result status="404" subTitle="Plan doesn't exist." />
        ) : (
          <Result
            status="error"
            subTitle="Unable to edit plan right now. Please try later."
          />
        )}
      </Center>
    );
  }

  return (
    <>
      <Header>
        <PageHeader
          title="Edit plan"
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
              onUpdatePlan({ values, formikHelpers })
            }
            validationSchema={schema}
            enableReinitialize
            validateOnChange={false}
          >
            {(formikHelpers) => {
              const { submitForm, isSubmitting, isValid } = formikHelpers;
              return (
                <PlanForm
                  onClear={() => {
                    onClearPlan(formikHelpers);
                  }}
                >
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
              );
            }}
          </Formik>
        </Box>
      </Content>
    </>
  );
};

export default UpdatePlan;
