import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CustomSemiRigDetailsFactory } from 'factories';
import DrillshipDetailsModal from 'containers/DrillshipDetailsModal';

export default {
  title: 'containers/DrillshipDetailsModal',
  component: DrillshipDetailsModal,
  argTypes: {
    onClose: { action: 'on close' },
  },
} as ComponentMeta<typeof DrillshipDetailsModal>;

const Template: ComponentStory<typeof DrillshipDetailsModal> = (props) => (
  <DrillshipDetailsModal {...props} />
);

export const Default = Template.bind({});
Default.args = {
  rig: CustomSemiRigDetailsFactory.build(),
  loading: false,
  error: false,
  visible: true,
  title: 'Rig description',
};
