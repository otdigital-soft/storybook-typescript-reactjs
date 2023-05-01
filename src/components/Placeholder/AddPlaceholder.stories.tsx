import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddPlaceholder } from 'components/Placeholder';

export default {
  title: 'components/Placeholder/AddPlaceholder',
  component: AddPlaceholder,
  argTypes: {
    onClick: { action: 'on click' },
  },
} as ComponentMeta<typeof AddPlaceholder>;

const Template: ComponentStory<typeof AddPlaceholder> = (args) => (
  <AddPlaceholder {...args} />
);

export const Default = Template.bind({});
Default.args = {
  height: 210,
  title: 'Create new element',
};
