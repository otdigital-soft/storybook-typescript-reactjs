import { Button, notification, Space } from 'antd';
import { ArgsProps, IconType } from 'antd/lib/notification';
import { Story } from '@storybook/react/dist/ts3.9/client/preview/types-6-3';

export default {
  title: 'antd/Notification',
  argTypes: {
    message: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    duration: {
      control: 'number',
    },
    placement: {
      options: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'center'],
      control: { type: 'select' },
    },
    btn: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: (
          <Button type="link" size="small">
            Undo action
          </Button>
        ),
        false: undefined,
      },
    },
  },
};

const Template = (args: ArgsProps) => {
  const openNotificationWithIcon = (type?: IconType) => {
    if (type) {
      notification[type](args);
    } else {
      notification.open(args);
    }
  };
  return (
    <Space>
      <Button onClick={() => openNotificationWithIcon()}>Default</Button>
      <Button onClick={() => openNotificationWithIcon('success')}>
        Success
      </Button>
      <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
      <Button onClick={() => openNotificationWithIcon('warning')}>
        Warning
      </Button>
      <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
    </Space>
  );
};

export const Default: Story<ArgsProps> = Template.bind({});
Default.args = {
  message: 'Notification Title',
  description:
    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  duration: 0,
  btn: false,
  placement: 'center',
};
