import { Button, Spin } from 'antd';
import Box from 'components/Box';
import Center from 'components/Center';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import Result from 'components/Result';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import { Formik } from 'formik';
import useBack from 'hooks/useBack';
import WellDetailsForm from 'pages/Wells/containers/WellDetailsForm';
import routes from 'routes';
import useCreateWell from 'pages/Wells/pages/CreateWell/hooks/useCreateWell';
import { SubmitRow } from 'components/Row';
import { useNavigate } from 'react-router-dom';
import WellPlanSteps from 'pages/WellPlan/components/WellPlanSteps';
import { WellPlanStep } from 'pages/WellPlan/consts';

const breadcrumbRoutes = [
  {
    path: routes.dashboard,
    breadcrumbName: 'Dashboard',
  },
  {
    path: routes.wells,
    breadcrumbName: 'Wells',
  },
  {
    path: '',
    breadcrumbName: 'Add well',
  },
];

const CreateWell = () => {
  const { handleBack } = useBack();
  const navigate = useNavigate();
  const { initialValues, onSubmit, validationSchema, isLoading, error } =
    useCreateWell();

  if (isLoading) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to create well right now" />
      </Center>
    );
  }

  return (
    <>
      <Header>
        <PageHeader
          title="Wells"
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box marginTop={44} marginBottom={106} marginX={28}>
          <Formik
            validationSchema={validationSchema}
            onSubmit={(values, formikHelpers) =>
              onSubmit({
                values,
                formikHelpers,
              })
            }
            initialValues={initialValues}
          >
            {({ submitForm, isValid, isSubmitting }) => {
              return (
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  backgroundColor="white"
                >
                  <WellPlanSteps activeStep={WellPlanStep.Details} />

                  <Box marginTop={30}>
                    <WellDetailsForm />
                  </Box>

                  <SubmitRow>
                    <Button onClick={() => navigate(routes.wells)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={submitForm}
                      type="primary"
                      disabled={!isValid || isSubmitting}
                    >
                      Save and continue
                    </Button>
                  </SubmitRow>
                </Box>
              );
            }}
          </Formik>
        </Box>
      </Content>
    </>
  );
};

export default CreateWell;
