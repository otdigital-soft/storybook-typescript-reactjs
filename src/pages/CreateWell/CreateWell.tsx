import Box from 'components/Box';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import { defaultBreadcrumbItemRender } from 'components/PageHeader/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import routes from 'routes';
import useBack from 'hooks/useBack';
import CreateWellForm, {
  CreateWellFormProvider,
} from 'containers/CreateWellForm';
import useOnCreateWellSuccess from 'pages/CreateWell/useOnCreateWellSuccess';

const CreateWell = () => {
  const { handleBack } = useBack(routes.prepare);
  const onCreateWellSuccess = useOnCreateWellSuccess();

  const breadcrumbRoutes = [
    {
      path: routes.prepare,
      breadcrumbName: 'Prepare',
    },
    {
      path: routes.createWell,
      breadcrumbName: 'Add well',
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
          title="Add well"
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <Box marginX={24} marginTop={20} marginBottom={106}>
          <CreateWellFormProvider onSuccess={onCreateWellSuccess}>
            <CreateWellForm />
          </CreateWellFormProvider>
        </Box>
      </Content>
    </>
  );
};

export default CreateWell;
