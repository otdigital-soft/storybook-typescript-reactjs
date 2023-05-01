import { ComponentStory, ComponentMeta } from '@storybook/react';
import AddEditSelect from './AddEditSelect';
import Box from 'components/Box';

export default {
  title: 'components/AddEditSelect',
  component: AddEditSelect,
  argTypes: {
    onEdit: { action: 'on edit' },
    onAdd: { action: 'on add' },
    onChange: { action: 'on change' },
  },
} as ComponentMeta<typeof AddEditSelect>;

const Template: ComponentStory<typeof AddEditSelect> = (args) => (
  <Box width={400}>
    <AddEditSelect {...args} />
  </Box>
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  options: [
    { label: 'Custom phase', value: '1' },
    { label: 'Waiting on weather', value: '2' },
    { label: 'Downtime', value: '3' },
  ],
  placeholder: 'Select item',
};
Default.parameters = { controls: { exclude: ['onAdd', 'onChange'] } };

export const AddEdit = Template.bind({});
AddEdit.args = {
  open: true,
  options: [
    { label: 'Custom phase', value: '1', editable: true },
    { label: 'Waiting on weather', value: '2' },
    { label: 'Downtime', value: '3' },
  ],
  placeholder: 'Select item',
  addNewLabel: 'Add new phase',
};
