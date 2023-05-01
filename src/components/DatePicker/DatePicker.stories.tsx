import { ComponentStory, ComponentMeta } from '@storybook/react';
import DatePicker from 'components/DatePicker';

export default {
  title: 'antd/DatePicker',
  component: DatePicker,
  argTypes: {
    onChange: { action: 'on change' },
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
    mode: {
      options: ['time', 'date', 'month', 'year', 'decade'],
      control: { type: 'select' },
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
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => (
  <DatePicker {...args} />
);

export const Default = Template.bind({});
Default.args = {};
