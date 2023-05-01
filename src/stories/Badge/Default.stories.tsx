import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Badge } from 'antd';

export default {
  title: 'antd/Badge',
  component: Badge,
  argTypes: {
    count: {
      control: 'number',
    },
    dot: {
      control: 'boolean',
    },
    size: {
      options: ['default', 'small'],
      control: { type: 'select' },
    },
    status: {
      options: ['success', 'processing', 'default', 'error', 'warning'],
      control: { type: 'select' },
    },
    text: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Badge>;

const Template: ComponentStory<typeof Badge> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  count: 1,
  dot: false,
  text: '',
};
