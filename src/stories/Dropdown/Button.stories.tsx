import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';

export default {
  title: 'antd/Dropdown/Button',
  component: Dropdown,
  argTypes: {
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
    },
    icon: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <SearchOutlined />,
        false: undefined,
      },
    },
    placement: {
      options: [
        'bottomLeft',
        'bottomCenter',
        'bottomRight',
        'topLeft',
        'topCenter',
        'topRight',
      ],
      control: { type: 'select' },
      defaultValue: 'bottomLeft',
    },
    size: {
      options: ['large', 'middle', 'small'],
      control: { type: 'select' },
      defaultValue: 'middle',
    },
    type: {
      options: ['primary', 'dashed', 'text', 'link', 'default', 'ghost'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
    visible: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => {
  const menu = (
    <Menu>
      <Menu.Item>1st menu item</Menu.Item>
      <Menu.Item icon={<DownOutlined />} disabled>
        2nd menu item (disabled)
      </Menu.Item>
      <Menu.Item disabled>3rd menu item (disabled)</Menu.Item>
      <Menu.Item danger>a danger item</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown.Button {...args} overlay={menu} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        Click me <DownOutlined />
      </a>
    </Dropdown.Button>
  );
};

export const Default = Template.bind({});
Default.args = {};
