import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Menu, Dropdown, Button, DropDownProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export default {
  title: 'antd/Dropdown',
  component: Dropdown,
  argTypes: {
    arrow: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
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
    visible: {
      control: 'boolean',
    },
    type: {
      options: ['link', 'button'],
      control: { type: 'select' },
      defaultValue: 'link',
    },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (
  args: DropDownProps & { type?: 'link' | 'button' },
) => {
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
  const { type, ...dropdownProps } = args;
  return (
    <Dropdown {...dropdownProps} overlay={menu} trigger={['click']}>
      <>
        {type === 'link' ? (
          <a onClick={(e) => e.preventDefault()}>
            Click me <DownOutlined />
          </a>
        ) : null}
        {type === 'button' ? (
          <Button>
            Dropdown <DownOutlined />
          </Button>
        ) : null}
      </>
    </Dropdown>
  );
};

export const Default = Template.bind({});
Default.args = {};
