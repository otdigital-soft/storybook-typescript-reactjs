import {
  BarChartOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
  HomeOutlined,
  LeftOutlined,
  MessageOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Avatar, MenuProps } from 'antd';
import logo from 'assets/images/logo.svg';
import Box, { Flexbox } from 'components/Box';
import { Text } from 'components/Typography';
import useMe from 'hooks/useMe';
import { PrepareTab } from 'pages/Prepare/Prepare';
import { useEffect, useState } from 'react';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { getInitials } from 'utils/format';
import { Logo, LogoutIcon, Sider, StyledMenu } from './DashboardSidebar.styled';
import useSignOut from './useSignOut';

enum MenuKey {
  Dashboard = 'Dashboard',
  Benchmark = 'Benchmark',
  BenchmarkAssets = 'BenchmarkAssets',
  BenchmarkWells = 'BenchmarkWells',
  BenchmarkProjects = 'BenchmarkProjects',
  BenchmarkBenchmark = 'BenchmarkBenchmark',
  BenchmarkMonitor = 'BenchmarkMonitor',
  EmissionsWellConstructionAssetAndMaterialInput = 'EmissionsWellConstructionAssetAndMaterialInput',
  EmissionsWellConstructionWells = 'EmissionsWellConstructionWells',
  EmissionsWellConstruction = 'EmissionsWellConstruction',
  EmissionsProduction = 'EmissionsProduction',
  EmissionsOffshoreWind = 'EmissionsOffshoreWind',
  Emissions = 'Emissions',
  Support = 'Support',
  Settings = 'Settings',
}

const MenuKeyPathMap: Record<MenuKey, string> = {
  [MenuKey.BenchmarkWells]: generatePath(routes.prepareTab, {
    tabId: PrepareTab.Wells,
  }),
  [MenuKey.BenchmarkProjects]: generatePath(routes.prepareTab, {
    tabId: PrepareTab.Projects,
  }),
  [MenuKey.BenchmarkBenchmark]: routes.studies,
  [MenuKey.BenchmarkMonitor]: routes.monitors,
  [MenuKey.BenchmarkAssets]: routes.prepare,
  [MenuKey.Benchmark]: routes.prepare,
  [MenuKey.EmissionsWellConstructionAssetAndMaterialInput]: routes.assets,
  [MenuKey.EmissionsWellConstructionWells]: routes.wells,
  [MenuKey.EmissionsWellConstruction]:
    '/dashboard/emissions/well-construction/',
  [MenuKey.EmissionsProduction]: '/dashboard/emissions/production/',
  [MenuKey.EmissionsOffshoreWind]: '/dashboard/emissions/offshore-wind/',
  [MenuKey.Emissions]: '/dashboard/emissions/',
  [MenuKey.Support]: routes.support,
  [MenuKey.Settings]: routes.settings,
  [MenuKey.Dashboard]: routes.launch,
};

const OpenKeys: Record<MenuKey, MenuKey[]> = {
  [MenuKey.Benchmark]: [],
  [MenuKey.BenchmarkAssets]: [MenuKey.Benchmark],
  [MenuKey.BenchmarkWells]: [MenuKey.Benchmark],
  [MenuKey.BenchmarkProjects]: [MenuKey.Benchmark],
  [MenuKey.BenchmarkBenchmark]: [MenuKey.Benchmark],
  [MenuKey.BenchmarkMonitor]: [MenuKey.Benchmark],
  [MenuKey.EmissionsWellConstructionAssetAndMaterialInput]: [
    MenuKey.Emissions,
    MenuKey.EmissionsWellConstruction,
  ],
  [MenuKey.EmissionsWellConstructionWells]: [
    MenuKey.Emissions,
    MenuKey.EmissionsWellConstruction,
  ],
  [MenuKey.EmissionsWellConstruction]: [MenuKey.Emissions],
  [MenuKey.EmissionsProduction]: [MenuKey.Emissions],
  [MenuKey.EmissionsOffshoreWind]: [MenuKey.Emissions],
  [MenuKey.Emissions]: [],
  [MenuKey.Support]: [],
  [MenuKey.Settings]: [],
  [MenuKey.Dashboard]: [],
};

const mapPathToMenuKey = (pathname: string): MenuKey => {
  for (const [key, path] of Object.entries(MenuKeyPathMap)) {
    if (pathname.startsWith(path)) {
      return key as MenuKey;
    }
  }
  return MenuKey.Dashboard;
};

const DashboardSidebar = () => {
  const { data: meData } = useMe();
  const { mutate: signOut } = useSignOut();
  const name = `${meData?.first_name} ${meData?.last_name}`;
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKeys, setSelectedKeys] = useState<MenuKey[]>([]);
  const [openKeys, setOpenKeys] = useState<MenuKey[]>([]);
  const onMenuClick: MenuProps['onClick'] = (info) => {
    navigate(MenuKeyPathMap[info.key as MenuKey]);
  };
  const onMenuOpenChange: MenuProps['onOpenChange'] = (changedOpenKeys) => {
    setOpenKeys(changedOpenKeys as MenuKey[]);
  };

  useEffect(() => {
    const menuKey = mapPathToMenuKey(location.pathname);
    setSelectedKeys([menuKey]);
    setOpenKeys(OpenKeys[menuKey]);
  }, [location.pathname]);

  return (
    <Sider width={256}>
      <Flexbox justifyContent="left" height="102px" paddingLeft={16}>
        <Logo src={logo} alt="Stepwise Logo" />
      </Flexbox>
      <Flexbox
        flexDirection="column"
        justifyContent="space-between"
        flexGrow={1}
      >
        <StyledMenu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onMenuOpenChange}
          onClick={onMenuClick}
          expandIcon={({ isSubMenu, isOpen }) =>
            isSubMenu ? isOpen ? <DownOutlined /> : <LeftOutlined /> : null
          }
        >
          <StyledMenu.Item icon={<HomeOutlined />} key={MenuKey.Dashboard}>
            Dashboard
          </StyledMenu.Item>
          <StyledMenu.SubMenu
            title="Benchmark"
            icon={<DeploymentUnitOutlined />}
            key={MenuKey.Benchmark}
          >
            <StyledMenu.Item key={MenuKey.BenchmarkAssets}>
              Assets
            </StyledMenu.Item>
            <StyledMenu.Item key={MenuKey.BenchmarkWells}>
              Wells
            </StyledMenu.Item>
            <StyledMenu.Item key={MenuKey.BenchmarkProjects}>
              Projects
            </StyledMenu.Item>
            <StyledMenu.Item key={MenuKey.BenchmarkBenchmark}>
              Benchmark
            </StyledMenu.Item>
            <StyledMenu.Item key={MenuKey.BenchmarkMonitor}>
              Monitor
            </StyledMenu.Item>
          </StyledMenu.SubMenu>
          <StyledMenu.SubMenu
            title="Emissions"
            key={MenuKey.Emissions}
            icon={<BarChartOutlined />}
          >
            <StyledMenu.SubMenu
              key={MenuKey.EmissionsWellConstruction}
              title="Well construction"
            >
              <StyledMenu.Item
                key={MenuKey.EmissionsWellConstructionAssetAndMaterialInput}
              >
                Asset & material input
              </StyledMenu.Item>
              <StyledMenu.Item key={MenuKey.EmissionsWellConstructionWells}>
                Wells
              </StyledMenu.Item>
            </StyledMenu.SubMenu>
            <StyledMenu.Item key={MenuKey.EmissionsProduction}>
              Production
            </StyledMenu.Item>
            <StyledMenu.Item key={MenuKey.EmissionsOffshoreWind}>
              Offshore wind
            </StyledMenu.Item>
          </StyledMenu.SubMenu>
        </StyledMenu>

        <Box>
          <StyledMenu
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onMenuOpenChange}
            onClick={onMenuClick}
          >
            <StyledMenu.Item icon={<MessageOutlined />} key={MenuKey.Support}>
              Support
            </StyledMenu.Item>
            <StyledMenu.Item icon={<SettingOutlined />} key={MenuKey.Settings}>
              Settings
            </StyledMenu.Item>
          </StyledMenu>
          <Box
            marginTop="28px"
            marginBottom="20px"
            marginLeft="8px"
            marginRight="8px"
          >
            <Flexbox
              paddingLeft="8px"
              paddingRight="8px"
              alignItems="center"
              width="100%"
              overflow="hidden"
            >
              <Box flexShrink={0}>
                <Avatar size={40} src={meData?.profile_image} alt={name}>
                  {getInitials(name)}
                </Avatar>
              </Box>
              <Flexbox
                marginLeft="12px"
                justifyContent="space-between"
                flexGrow={1}
                width="100%"
                overflow="hidden"
              >
                <Flexbox flexDirection="column" width="100%" overflow="hidden">
                  <Text fontWeight="500" ellipsis>
                    {name}
                  </Text>
                  <Text type="secondary" ellipsis>
                    {`${meData?.email}`}
                  </Text>
                </Flexbox>
                <Box marginLeft="8px">
                  <LogoutIcon title="Sign out" onClick={() => signOut()} />
                </Box>
              </Flexbox>
            </Flexbox>
          </Box>
        </Box>
      </Flexbox>
    </Sider>
  );
};

export default DashboardSidebar;
