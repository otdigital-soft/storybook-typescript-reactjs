import { Spin } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import Box from 'components/Box';
import Center from 'components/Center';
import { Content, Header } from 'components/Layout';
import PageHeader, { defaultBreadcrumbItemRender } from 'components/PageHeader';
import Result from 'components/Result';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import useBack from 'hooks/useBack';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useAsset from 'pages/Assets/pages/UpdateAsset/hooks/useAsset';
import routes from 'routes';
import { isNotFoundError } from 'utils/api';
import AssetDetails from './containers/AssetDetails';
import Baselines from './containers/Baselines';
import EmissionManagementPlans from './containers/EmissionManagementPlans';
import AddEditActionsProvider from 'containers/AddEditActionsProvider';

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

const UpdateAsset = () => {
  const assetId = useAssetId();
  const { error: assetError, isLoading: isLoadingAsset } = useAsset(assetId);
  const { handleBack } = useBack();

  if (isLoadingAsset) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }
  if (assetError) {
    return (
      <Center flexGrow={1}>
        {isNotFoundError(assetError) ? (
          <Result status="404" subTitle="Asset doesn't exist." />
        ) : (
          <Result status="error" subTitle="Unable to load asset right now." />
        )}
      </Center>
    );
  }

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
        <AddEditActionsProvider>
          <Box paddingX={28} paddingBottom={106} paddingTop={40}>
            <AssetDetails />
            <Box marginTop={33}>
              <Baselines />
            </Box>
            <Box marginTop={41}>
              <EmissionManagementPlans />
            </Box>
          </Box>
        </AddEditActionsProvider>
      </Content>
    </>
  );
};

export default UpdateAsset;
