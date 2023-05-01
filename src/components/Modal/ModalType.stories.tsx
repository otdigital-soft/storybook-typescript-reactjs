import { Story } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';
import { Button, Space } from 'antd';
import { ModalFuncProps, ModalProps } from 'antd/lib/modal/Modal';
import Modal from 'components/Modal';

export default {
  title: 'antd/Modal/Information',
  argTypes: {
    title: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
  },
};

const Template = (args: ModalProps) => {
  const openInformationModal = (type: ModalFuncProps['type']) => {
    if (type) {
      Modal[type](args);
    }
  };
  return (
    <Space>
      <Button onClick={() => openInformationModal('success')}>Success</Button>
      <Button onClick={() => openInformationModal('info')}>Info</Button>
      <Button onClick={() => openInformationModal('warning')}>Warning</Button>
      <Button onClick={() => openInformationModal('error')}>Error</Button>
    </Space>
  );
};

export const Default: Story<ModalFuncProps> = Template.bind({});
Default.args = {
  title: 'This is a message',
  content: 'some messages...some messages...',
};
