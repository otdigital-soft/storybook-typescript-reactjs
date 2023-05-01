import { ComponentStory, ComponentMeta } from '@storybook/react';
import Modal from 'components/Modal';

export default {
  title: 'antd/Modal',
  component: Modal,
  argTypes: {
    title: {
      control: 'text',
    },
    visible: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => (
  <Modal {...args}>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Modal>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Basic Modal',
  visible: true,
};
