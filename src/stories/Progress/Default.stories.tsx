import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Progress } from 'antd';

export default {
  title: 'antd/Progress',
  component: Progress,
  argTypes: {
    percent: {
      control: 'number',
    },
    showInfo: {
      control: 'boolean',
    },
    status: {
      options: ['success', 'exception', 'normal', 'active', undefined],
      control: { type: 'select' },
    },
    type: {
      options: ['line', 'circle', 'dashboard', undefined],
      control: { type: 'select' },
    },
    size: {
      options: ['small', undefined],
      control: { type: 'select' },
    },
    strokeWidth: {
      control: 'number',
    },
    steps: {
      control: 'number',
    },
    strokeColor: {
      control: 'color',
    },
    width: {
      control: 'number',
    },
  },
} as ComponentMeta<typeof Progress>;

const Template: ComponentStory<typeof Progress> = (args) => (
  <Progress {...args} />
);

export const Default = Template.bind({});
Default.args = {
  percent: 50,
  showInfo: true,
  status: undefined,
  type: undefined,
  size: undefined,
  strokeColor: undefined,
  width: 132,
};
