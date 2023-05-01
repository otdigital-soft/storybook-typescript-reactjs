import { QuestionCircleOutlined } from '@ant-design/icons';
import { Content, Header } from 'components/Layout';
import Tabs from 'components/Tabs';
import Faq from './Faq';
import PageHeader from 'components/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import Box from 'components/Box';
import routes from 'routes';

const breadcrumbRoutes: Route[] = [
  {
    path: routes.support,
    breadcrumbName: 'Support',
  },
];

const Support = () => {
  return (
    <>
      <Header>
        <PageHeader
          title={'FAQ'}
          breadcrumb={{ routes: breadcrumbRoutes }}
          extra={<PageHeaderExtra />}
        />
      </Header>

      <Content>
        <Box marginX={24} marginY={20}>
          <Tabs defaultActiveKey="faq">
            <Tabs.TabPane
              key="faq"
              tab={
                <span>
                  <QuestionCircleOutlined />
                  FAQ
                </span>
              }
            >
              <Box marginTop={20}>
                <Faq />
              </Box>
            </Tabs.TabPane>
          </Tabs>
        </Box>
      </Content>
    </>
  );
};

export default Support;
