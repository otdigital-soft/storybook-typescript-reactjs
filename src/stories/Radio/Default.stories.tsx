import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Radio } from 'antd';

export default {
  title: 'antd/Radio',
  component: Radio,
  argTypes: {
    onChange: { action: 'on change' },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Radio>;

const Template: ComponentStory<typeof Radio> = (args) => <Radio {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
  checked: false,
  disabled: false,
};
