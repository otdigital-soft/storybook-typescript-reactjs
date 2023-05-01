import { ComponentStory, ComponentMeta } from '@storybook/react';
import CardSkeleton from 'components/CardSkeleton';

export default {
  title: 'components/CardSkeleton',
  component: CardSkeleton,
  argTypes: {},
} as ComponentMeta<typeof CardSkeleton>;

const Template: ComponentStory<typeof CardSkeleton> = (args) => (
  <CardSkeleton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  gutter: [16, 16],
  span: 6,
  numElements: 10,
};
