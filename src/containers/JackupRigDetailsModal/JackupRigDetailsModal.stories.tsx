import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CustomJackupRigDetailsFactory } from 'factories';
import JackupRigDetailsModal from 'containers/JackupRigDetailsModal';

export default {
  title: 'containers/JackupRigDetailsModal',
  component: JackupRigDetailsModal,
  argTypes: {
    onClose: { action: 'on close' },
  },
} as ComponentMeta<typeof JackupRigDetailsModal>;

const Template: ComponentStory<typeof JackupRigDetailsModal> = (props) => (
  <JackupRigDetailsModal {...props} />
);

export const Default = Template.bind({});
Default.args = {
  rig: CustomJackupRigDetailsFactory.build(),
  loading: false,
  error: false,
  visible: true,
  title: 'Rig description',
};
