import { ComponentStory, ComponentMeta } from '@storybook/react';
import DatePicker from 'components/DatePicker';

const { RangePicker } = DatePicker;

export default {
  title: 'antd/DatePicker/RangePicker',
  component: RangePicker,
  argTypes: {
    allowClear: {
      control: 'boolean',
      defaultValue: true,
    },
    showTime: {
      control: 'boolean',
    },
    bordered: {
      control: 'boolean',
      defaultValue: true,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    open: {
      control: 'boolean',
    },
    picker: {
      options: ['date', 'week', 'month', 'quarter', 'year'],
      control: { type: 'select' },
      defaultValue: 'date',
    },
    placeholder: {
      control: {
        type: 'text',
      },
    },
    size: {
      options: ['large', 'middle', 'small'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof RangePicker>;

const Template: ComponentStory<typeof RangePicker> = (args) => (
  <DatePicker.RangePicker {...args} />
);

export const Default = Template.bind({});
Default.args = {};
