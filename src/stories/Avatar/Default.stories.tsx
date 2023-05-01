import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar, AvatarProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default {
  title: 'antd/Avatar',
  component: Avatar,
  argTypes: {
    gap: {
      control: 'number',
      defaultValue: 4,
    },
    shape: {
      options: ['circle', 'square'],
      control: { type: 'select' },
      defaultValue: 'circle',
    },
    size: {
      options: ['large', 'small', 'default', 'custom'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
    customSize: {
      control: 'number',
    },
    children: {
      control: 'text',
    },
    icon: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <UserOutlined />,
        false: undefined,
      },
    },
    src: {
      name: 'image',
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: 'https://joeschmoe.io/api/v1/random',
        false: undefined,
      },
    },
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (
  args: AvatarProps & { customSize?: number },
) => (
  <Avatar
    {...args}
    size={args.size === 'custom' ? args.customSize : args.size}
  />
);

export const Default = Template.bind({});
Default.args = {
  children: '',
};
