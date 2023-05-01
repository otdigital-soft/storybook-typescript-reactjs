import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu } from 'antd';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
} from '@ant-design/icons';

export default {
  title: 'antd/Menu',
  component: Menu,
  argTypes: {
    mode: {
      options: ['vertical', 'horizontal', 'inline'],
      control: { type: 'select' },
      defaultValue: 'vertical',
    },
    inlineCollapsed: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu {...args} triggerSubMenuAction="click">
    <Menu.Item key="1" icon={<MailOutlined />}>
      Navigation One
    </Menu.Item>
    <Menu.Item key="2" icon={<CalendarOutlined />} danger>
      Navigation Two
    </Menu.Item>
    <Menu.SubMenu key="sub1" icon={<AppstoreOutlined />} title="Navigation Two">
      <Menu.Item key="3">Option 3</Menu.Item>
      <Menu.Item key="4">Option 4</Menu.Item>
      <Menu.SubMenu key="sub1-2" title="Submenu">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
      </Menu.SubMenu>
    </Menu.SubMenu>
    <Menu.SubMenu
      key="sub2"
      icon={<SettingOutlined />}
      title="Navigation Three"
    >
      <Menu.Item key="7">Option 7</Menu.Item>
      <Menu.Item key="8">Option 8</Menu.Item>
      <Menu.Item key="9">Option 9</Menu.Item>
      <Menu.Item key="10">Option 10</Menu.Item>
    </Menu.SubMenu>
    <Menu.Item key="link" icon={<LinkOutlined />}>
      <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
        Ant Design
      </a>
    </Menu.Item>
  </Menu>
);

export const Default = Template.bind({});
Default.args = {};
