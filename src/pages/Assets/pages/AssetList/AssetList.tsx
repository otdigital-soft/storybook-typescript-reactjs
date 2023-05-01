import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import Box from 'components/Box';
import { Content, Header } from 'components/Layout';
import PageHeader, { defaultBreadcrumbItemRender } from 'components/PageHeader';
import Tabs from 'components/Tabs';
import AddEditActionsProvider from 'containers/AddEditActionsProvider';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import useBack from 'hooks/useBack';
import { useState } from 'react';
import routes from 'routes';
import DrillingAssets from './containers/DrillingAssets';
import Helicopters from './containers/Helicopters';
import Materials from './containers/Materials';
import Vessels from './containers/Vessels';

const breadcrumbRoutes: Route[] = [
  {
    path: routes.dashboard,
    breadcrumbName: 'Dashboard',
  },
  {
    path: '',
    breadcrumbName: 'Well construction',
  },
];

enum AssetListTab {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  DrillingAssets = 'DrillingAssets',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Vessels = 'Vessels',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Helicopters = 'Helicopters',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Materials = 'Materials',
}

const AssetList = () => {
  const { handleBack } = useBack();
  const [activeTab, setActiveTab] = useState(AssetListTab.DrillingAssets);

  return (
    <>
      <Header>
        <PageHeader
          title="Asset & material input"
          onBack={handleBack}
          breadcrumb={{
            routes: breadcrumbRoutes,
            itemRender: defaultBreadcrumbItemRender,
          }}
          extra={<PageHeaderExtra />}
        />
      </Header>

      <Content>
        <Box paddingX={28} paddingTop={44} paddingBottom={74}>
          <AddEditActionsProvider>
            <Tabs
              activeKey={activeTab}
              onChange={(key) => setActiveTab(key as AssetListTab)}
              type="card"
              size="large"
              destroyInactiveTabPane
            >
              <Tabs.TabPane
                tab="Drilling assets"
                key={AssetListTab.DrillingAssets}
              >
                <Box marginTop={16}>
                  <DrillingAssets />
                </Box>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Vessels" key={AssetListTab.Vessels}>
                <Box marginTop={16}>
                  <Vessels />
                </Box>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Helicopters" key={AssetListTab.Helicopters}>
                <Box marginTop={16}>
                  <Helicopters />
                </Box>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Materials" key={AssetListTab.Materials}>
                <Box marginTop={16}>
                  <Materials />
                </Box>
              </Tabs.TabPane>
            </Tabs>
          </AddEditActionsProvider>
        </Box>
      </Content>
    </>
  );
};

export default AssetList;
