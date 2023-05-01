import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from 'containers/Dashboard/DashboardSidebar';

const Dashboard = () => {
  return (
    <Layout>
      <DashboardSidebar />
      <Layout>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default Dashboard;
