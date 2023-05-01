import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import useBack from 'hooks/useBack';
import routes from 'routes';
import useUpdateProject from './useUpdateProject';
import { Formik } from 'formik';
import { Button, Spin } from 'antd';
import { SubmitRow } from 'components/Row';
import { generatePath, useParams } from 'react-router-dom';
import useProject from 'hooks/useProject';
import ProjectForm from 'containers/ProjectForm';
import Center from 'components/Center';
import Result from 'components/Result';
import Box from 'components/Box';
import { isNotFoundError } from 'utils/api';

const UpdateProject = () => {
  const { handleBack } = useBack(routes.launch);
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: projectData,
    isLoading: isLoadingProject,
    error: projectError,
  } = useProject(Number(projectId));
  const {
    mutation: { mutateAsync: onUpdateProject },
    initialValues,
    schema,
    onClear,
  } = useUpdateProject(Number(projectId), projectData);
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
      path: generatePath(routes.updateProject, {
        projectId: String(projectId),
      }),
      breadcrumbName: 'Edit project',
    },
  ];

  if (isLoadingProject) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }
  if (projectError) {
    return (
      <Center flexGrow={1}>
        {isNotFoundError(projectError) ? (
          <Result status="404" subTitle="Project doesn't exist." />
        ) : (
          <Result status="error" subTitle="Unable to edit project right now." />
        )}
      </Center>
    );
  }
  return (
    <>
      <Header>
        <PageHeader
          title="Edit project"
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
              onUpdateProject({ values, formikHelpers })
            }
            validationSchema={schema}
            validateOnChange={false}
          >
            {(formikHelpers) => {
              const { submitForm, isSubmitting, isValid } = formikHelpers;
              const handleOnClear = onClear
                ? () => onClear(formikHelpers)
                : undefined;
              return (
                <ProjectForm onClear={handleOnClear}>
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
                </ProjectForm>
              );
            }}
          </Formik>
        </Box>
      </Content>
    </>
  );
};

export default UpdateProject;
