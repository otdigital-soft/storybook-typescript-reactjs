import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Card } from 'antd';

export default {
  title: 'antd/Card',
  component: Card,
  argTypes: {
    title: {
      control: 'text',
      defaultValue: 'Default size card',
    },
    size: {
      options: ['default', 'small'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
    type: {
      options: ['inner', 'default'],
      control: { type: 'select' },
    },
    loading: {
      control: 'boolean',
    },
    extra: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <a href="#">More</a>,
        false: undefined,
      },
    },
    children: {
      control: 'text',
      defaultValue: 'Inner Card content',
    },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {};
