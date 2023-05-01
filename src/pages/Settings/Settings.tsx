import {
  CarryOutOutlined,
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { Content, Header } from 'components/Layout';
import PageHeader from 'components/PageHeader';
import PageHeaderExtra from 'containers/PageHeaderExtra';
import { useState } from 'react';
import Consents from './Consents';
import General from './General';
import Security from './Security';
import { SettingsTabs } from './Settings.styled';

const routes: Route[] = [
  {
    path: 'index',
    breadcrumbName: 'Settings',
  },
];

const Settings = () => {
  const [pageTitle, setPageTitle] = useState<string | undefined>('General');

  return (
    <>
      <Header>
        <PageHeader
          title={pageTitle}
          breadcrumb={{ routes }}
          extra={<PageHeaderExtra />}
        />
      </Header>
      <Content>
        <SettingsTabs
          onChange={(key) => {
            setPageTitle(
              {
                general: 'General',
                security: 'Security',
                consents: 'Consent',
              }[key],
            );
          }}
          defaultActiveKey="general"
        >
          <SettingsTabs.TabPane
            key="general"
            tab={
              <span>
                <UserOutlined />
                General
              </span>
            }
          >
            <General />
          </SettingsTabs.TabPane>
          <SettingsTabs.TabPane
            key="security"
            tab={
              <span>
                <LockOutlined />
                Security
              </span>
            }
          >
            <Security />
          </SettingsTabs.TabPane>
          <SettingsTabs.TabPane
            key="consents"
            tab={
              <span>
                <CarryOutOutlined />
                Consents
              </span>
            }
          >
            <Consents />
          </SettingsTabs.TabPane>
        </SettingsTabs>
      </Content>
    </>
  );
};

export default Settings;
