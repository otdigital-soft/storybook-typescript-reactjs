import { Content, Header } from 'components/Layout';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import PageHeader from 'components/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import Box from 'components/Box';
import Tabs from 'components/Tabs';
import { ReactComponent as RigOutlined } from 'assets/icons/RigOutlined.svg';
import { ReactComponent as WellOutlined } from 'assets/icons/WellOutlined.svg';
import { UpSquareOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import AllElements from './AllElements';
import Projects from './Projects';
import Wells from './Wells';
import Rigs from './Rigs';
import routes from 'routes';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

export enum PrepareTab {
  All = 'all',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Projects = 'projects',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Wells = 'wells',
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Rigs = 'rigs',
}

const breadcrumbRoutes: Route[] = [
  {
    path: routes.prepare,
    breadcrumbName: 'Prepare',
  },
];

const title = {
  [PrepareTab.All]: 'Overview',
  [PrepareTab.Projects]: 'Project list',
  [PrepareTab.Wells]: 'Well list',
  [PrepareTab.Rigs]: 'Rig list',
};

const Prepare = () => {
  const navigate = useNavigate();
  const { tabId } = useParams<{ tabId: PrepareTab }>();
  const activeTab = tabId ? tabId : PrepareTab.All;
  return (
    <>
      <Header>
        <PageHeader
          title={title[activeTab]}
          breadcrumb={{ routes: breadcrumbRoutes }}
          extra={<PageHeaderExtra />}
        />
      </Header>

      <Content>
        <Box paddingX={24} paddingY={20}>
          <Box>
            <Tabs
              activeKey={activeTab}
              onChange={(activeKey) =>
                navigate(
                  generatePath(routes.prepareTab, {
                    tabId: activeKey as PrepareTab,
                  }),
                )
              }
            >
              <Tabs.TabPane
                tab={
                  <span>
                    <UpSquareOutlined />
                    All
                  </span>
                }
                key={PrepareTab.All}
              >
                <Box marginTop={20}>
                  <AllElements />
                </Box>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span>
                    <DeploymentUnitOutlined />
                    Projects
                  </span>
                }
                key={PrepareTab.Projects}
              >
                <Box marginTop={20}>
                  <Projects />
                </Box>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span>
                    <span className="anticon">
                      <WellOutlined />
                    </span>
                    Wells
                  </span>
                }
                key={PrepareTab.Wells}
              >
                <Box marginTop={20}>
                  <Wells />
                </Box>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span>
                    <span className="anticon">
                      <RigOutlined />
                    </span>
                    Rigs
                  </span>
                }
                key={PrepareTab.Rigs}
              >
                <Box marginTop={20}>
                  <Rigs />
                </Box>
              </Tabs.TabPane>
            </Tabs>
          </Box>
        </Box>
      </Content>
    </>
  );
};

export default Prepare;
