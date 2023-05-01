import { ComponentStory, ComponentMeta } from '@storybook/react';
import Divider from 'components/Divider';

export default {
  title: 'antd/Divider',
  component: Divider,
  argTypes: {
    dashed: {
      control: 'boolean',
      defaultValue: false,
    },
    orientation: {
      options: ['left', 'right', 'center'],
      control: { type: 'select' },
      defaultValue: 'center',
    },
    orientationMargin: {
      control: { type: 'text' },
    },
    plain: {
      control: 'boolean',
      defaultValue: true,
    },
    type: {
      options: ['horizontal', 'vertical'],
      control: { type: 'select' },
      defaultValue: 'horizontal',
    },
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <Divider {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Divider Label',
};
