import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Steps } from 'antd';

export default {
  title: 'antd/Steps',
  component: Steps,
  argTypes: {
    current: {
      control: 'number',
    },
    direction: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
    },
    size: {
      options: ['default', 'small'],
      control: { type: 'select' },
    },
    status: {
      options: ['wait', 'process', 'finish', 'error'],
      control: { type: 'select' },
    },
    type: {
      options: ['default', 'navigation'],
      control: { type: 'select' },
    },
    progressDot: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Steps>;

const Template: ComponentStory<typeof Steps> = (args) => (
  <Steps {...args}>
    <Steps.Step title="Finished" description="This is a description." />
    <Steps.Step
      title="In Progress"
      subTitle="Left 00:00:08"
      description="This is a description."
    />
    <Steps.Step title="Waiting" description="This is a description." />
  </Steps>
);

export const Default = Template.bind({});
Default.args = {
  direction: 'horizontal',
  current: 0,
  size: 'default',
  status: 'process',
  type: 'default',
  progressDot: false,
};
