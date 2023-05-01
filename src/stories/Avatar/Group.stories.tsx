import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar } from 'antd';
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { GroupProps } from 'antd/lib/avatar/group';

export default {
  title: 'antd/Avatar/Group',
  component: Avatar.Group,
  argTypes: {
    maxCount: {
      control: 'number',
      defaultValue: 2,
    },
    size: {
      options: ['large', 'small', 'default', 'custom'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
    customSize: {
      control: 'number',
    },
  },
} as ComponentMeta<typeof Avatar.Group>;

const Template: ComponentStory<typeof Avatar.Group> = (
  args: GroupProps & { customSize?: number },
) => (
  <Avatar.Group
    {...args}
    size={args.size === 'custom' ? args.customSize : args.size}
  >
    <Avatar src="https://joeschmoe.io/api/v1/random" />
    <Avatar>K</Avatar>
    <Avatar icon={<UserOutlined />} />
    <Avatar icon={<AntDesignOutlined />} />
  </Avatar.Group>
);

export const Default = Template.bind({});
Default.args = {};
