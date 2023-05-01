import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Skeleton } from 'antd';

export default {
  title: 'antd/Skeleton',
  component: Skeleton,
  argTypes: {
    active: {
      control: 'boolean',
    },
    avatar: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    paragraph: {
      control: 'boolean',
    },
    round: {
      control: 'boolean',
    },
    title: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  active: false,
  avatar: false,
  loading: true,
  paragraph: true,
  round: false,
  title: true,
};
