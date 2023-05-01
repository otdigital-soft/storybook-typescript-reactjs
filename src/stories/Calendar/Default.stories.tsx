import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Calendar } from 'antd';

export default {
  title: 'antd/Calendar',
  component: Calendar,
  argTypes: {
    fullscreen: {
      control: 'boolean',
      defaultValue: true,
    },
  },
} as ComponentMeta<typeof Calendar>;

const Template: ComponentStory<typeof Calendar> = (args) => (
  <div style={args.fullscreen ? {} : { width: '300px' }}>
    <Calendar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
