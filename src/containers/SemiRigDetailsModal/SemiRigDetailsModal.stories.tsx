import { ComponentStory, ComponentMeta } from '@storybook/react';
import { CustomSemiRigDetailsFactory } from 'factories';
import SemiRigDetailsModal from 'containers/SemiRigDetailsModal';

export default {
  title: 'containers/SemiRigDetailsModal',
  component: SemiRigDetailsModal,
  argTypes: {
    onClose: { action: 'on close' },
  },
} as ComponentMeta<typeof SemiRigDetailsModal>;

const Template: ComponentStory<typeof SemiRigDetailsModal> = (props) => (
  <SemiRigDetailsModal {...props} />
);

export const Default = Template.bind({});
Default.args = {
  rig: CustomSemiRigDetailsFactory.build(),
  loading: false,
  error: false,
  visible: true,
  title: 'Rig description',
};
