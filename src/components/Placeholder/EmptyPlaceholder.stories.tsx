import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EmptyPlaceholder } from 'components/Placeholder';

export default {
  title: 'components/Placeholder/EmptyPlaceholder',
  component: EmptyPlaceholder,
} as ComponentMeta<typeof EmptyPlaceholder>;

const Template: ComponentStory<typeof EmptyPlaceholder> = (args) => (
  <EmptyPlaceholder {...args} />
);

export const Default = Template.bind({});
Default.args = {
  height: 86,
  title: 'No element to show',
};
