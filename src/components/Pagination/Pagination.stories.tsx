import { ComponentStory, ComponentMeta } from '@storybook/react';
import Pagination from 'components/Pagination';

export default {
  title: 'antd/Pagination',
  component: Pagination,
  argTypes: {
    defaultCurrent: {
      control: 'number',
    },
    total: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    showQuickJumper: {
      control: 'boolean',
    },
    showSizeChanger: {
      control: 'boolean',
    },
    showTitle: {
      control: 'boolean',
    },
    simple: {
      control: 'boolean',
    },
    size: {
      options: ['default', 'small'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = {
  defaultCurrent: 1,
  total: 50,
  showQuickJumper: false,
  showTitle: true,
  size: 'default',
};
