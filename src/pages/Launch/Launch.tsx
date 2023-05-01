import { Content, Header } from 'components/Layout';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import PageHeader from 'components/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import AvailableMonitors from 'pages/Launch/AvailableMonitors';
import AvailableProjects from 'pages/Launch/AvailableProjects';
import AvailableStudies from 'pages/Launch/AvailableStudies';
import NewElements from 'pages/Launch/NewElements';
import Box from 'components/Box';

const routes: Route[] = [
  {
    path: 'index',
    breadcrumbName: 'Launch',
  },
];

const Launch = () => {
  return (
    <>
      <Header>
        <PageHeader
          title="Overview"
          breadcrumb={{ routes }}
          extra={<PageHeaderExtra />}
        />
      </Header>

      <Content>
        <Box overflowX="hidden">
          <AvailableMonitors />

          <AvailableProjects />

          <AvailableStudies />

          <NewElements />
        </Box>
      </Content>
    </>
  );
};

export default Launch;
