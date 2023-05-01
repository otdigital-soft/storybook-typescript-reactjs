import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { Content, Header } from 'components/Layout';
import PageHeader, { defaultBreadcrumbItemRender } from 'components/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import useBack from 'hooks/useBack';
import routes from 'routes';
import GaugeChart from './GaugeChart';

const breadcrumbRoutes: Route[] = [
  {
    path: routes.dashboard,
    breadcrumbName: 'Dashboard',
  },
  {
    path: '',
    breadcrumbName: 'Wells',
  },
];

const WellList = () => {
  const { handleBack } = useBack();
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
        {/* <Box paddingX={28} paddingTop={44} paddingBottom={74}>
          <Wells />
        </Box> */}
        <GaugeChart />
      </Content>
    </>
  );
};

export default WellList;
