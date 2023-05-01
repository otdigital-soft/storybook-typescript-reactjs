import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select, Dropdown } from 'antd';

export default {
  title: 'antd/Select',
  component: Dropdown,
  argTypes: {
    size: {
      options: ['large', 'middle', 'small'],
      control: { type: 'select' },
    },
    mode: {
      options: ['multiple', 'tags', undefined],
      control: { type: 'select' },
    },
    disabled: {
      control: 'boolean',
    },
    allowClear: {
      control: 'boolean',
    },
    open: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => {
  return (
    <Select style={{ width: 300 }} {...args}>
      <Select.Option value="jack">Jack</Select.Option>
      <Select.Option value="lucy">Lucy</Select.Option>
      <Select.Option value="disabled" disabled>
        Disabled
      </Select.Option>
      <Select.Option value="Yiminghe">yiminghe</Select.Option>
    </Select>
  );
};

export const Default = Template.bind({});
Default.args = {
  size: 'middle',
  mode: undefined,
  disabled: false,
  allowClear: false,
  open: false,
  placeholder: 'Select',
};
