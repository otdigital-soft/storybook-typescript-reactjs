import { ComponentStory, ComponentMeta } from '@storybook/react';
import DraggableCard from 'components/DraggableCard';

export default {
  title: 'components/DraggableCard',
  component: DraggableCard,
  argTypes: {
    onAdd: { action: 'on add' },
    onRemove: { action: 'on remove' },
  },
} as ComponentMeta<typeof DraggableCard>;

const Template: ComponentStory<typeof DraggableCard> = (args) => (
  <DraggableCard {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Test card',
  elementName: 'test element',
  children: 'Test description',
};
