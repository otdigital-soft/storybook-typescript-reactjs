import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import useBack from 'hooks/useBack';
import routes from 'routes';
import useCreateProject from './useCreateProject';
import { Formik } from 'formik';
import { Button } from 'antd';
import { SubmitRow } from 'components/Row';
import ProjectForm from 'containers/ProjectForm';
import Box from 'components/Box';

const breadcrumbRoutes = [
  {
    path: routes.prepare,
    breadcrumbName: 'Prepare',
  },
  {
    path: routes.createProject,
    breadcrumbName: 'Create new project',
  },
];

const CreateProject = () => {
  const { handleBack } = useBack(routes.launch);
  const {
    mutation: { mutateAsync: onCreateProject },
    initialValues,
    schema,
  } = useCreateProject();

  return (
    <>
      <Header>
        <PageHeader
          title="Create new project"
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
              onCreateProject({ values, formikHelpers })
            }
            validationSchema={schema}
            validateOnChange={false}
          >
            {({ submitForm, isSubmitting, isValid }) => (
              <ProjectForm>
                <SubmitRow>
                  <>
                    <Button onClick={handleBack}>Cancel</Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={submitForm}
                      disabled={isSubmitting || !isValid}
                    >
                      Create
                    </Button>
                  </>
                </SubmitRow>
              </ProjectForm>
            )}
          </Formik>
        </Box>
      </Content>
    </>
  );
};

export default CreateProject;
