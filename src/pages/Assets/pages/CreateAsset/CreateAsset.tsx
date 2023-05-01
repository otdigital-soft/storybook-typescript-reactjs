import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import Box from 'components/Box';
import { Content, Header } from 'components/Layout';
import PageHeader, { defaultBreadcrumbItemRender } from 'components/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import { Formik } from 'formik';
import useBack from 'hooks/useBack';
import AssetDetailsForm from 'pages/Assets/containers/AssetDetailsForm';
import routes from 'routes';
import useCreateAsset from './hooks/useCreateAsset';

const breadcrumbRoutes: Route[] = [
  {
    path: routes.dashboard,
    breadcrumbName: 'Dashboard',
  },
  {
    path: '',
    breadcrumbName: 'Emissions',
  },
];

const CreateAsset = () => {
  const { handleBack } = useBack();
  const { initialValues, onSubmit, validationSchema } = useCreateAsset();

  return (
    <>
      <Header>
        <PageHeader
          title="Well construction"
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box paddingX={25} paddingBottom={106} paddingTop={53}>
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
            <AssetDetailsForm
              disabledFields={{
                draft: true,
              }}
            />
          </Formik>
        </Box>
      </Content>
    </>
  );
};

export default CreateAsset;
