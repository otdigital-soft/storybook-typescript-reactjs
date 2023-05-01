import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Slider } from 'antd';

export default {
  title: 'antd/Slider',
  component: Slider,
  argTypes: {
    range: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    dots: {
      control: 'boolean',
      defaultValue: false,
    },
    vertical: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => (
  <Slider {...args} style={args.vertical ? { height: 300 } : {}} />
);

export const Default = Template.bind({});
Default.args = {};
