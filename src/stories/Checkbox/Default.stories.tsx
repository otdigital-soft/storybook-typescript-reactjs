import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from 'antd';

export default {
  title: 'antd/Checkbox',
  component: Checkbox,
  argTypes: {
    onChange: { action: 'on change' },
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    indeterminate: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
  checked: false,
  disabled: false,
  indeterminate: false,
};
