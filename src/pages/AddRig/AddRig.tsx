import Box from 'components/Box';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import routes from 'routes';
import CreateRigForm from 'containers/CreateRigForm';
import useBack from 'hooks/useBack';
import CreateRigFormProvider from 'containers/CreateRigForm/CreateRigFormProvider';

const AddRig = () => {
  const { handleBack } = useBack(routes.prepare);

  const breadcrumbRoutes = [
    {
      path: routes.prepare,
      breadcrumbName: 'Prepare',
    },
    {
      path: routes.createRig,
      breadcrumbName: 'Add Rig',
    },
  ];

  return (
    <>
      <Header>
        <PageHeader
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          title="Add Rig"
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box paddingTop={20}>
          <CreateRigFormProvider>
            <CreateRigForm />
          </CreateRigFormProvider>
        </Box>
      </Content>
    </>
  );
};

export default AddRig;
