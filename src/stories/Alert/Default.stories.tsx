import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Alert } from 'antd';

export default {
  title: 'antd/Alert',
  component: Alert,
  argTypes: {
    banner: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
    showIcon: {
      control: 'boolean',
    },
    message: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    closeText: {
      control: 'text',
    },
    type: {
      options: ['success', 'info', 'warning', 'error', undefined],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  banner: false,
  closable: false,
  showIcon: false,
  message: 'Alert title',
  description: '',
  type: undefined,
  closeText: '',
};
