import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tooltip } from 'antd';

export default {
  title: 'antd/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      control: 'text',
    },
    visible: {
      control: 'boolean',
    },
    placement: {
      options: [
        'top',
        'left',
        'right',
        'bottom',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
        'leftTop',
        'leftBottom',
        'rightTop',
        'rightBottom',
      ],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Tooltip>;

const Template: ComponentStory<typeof Tooltip> = (args) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <Tooltip {...args}>
      <span>Tooltip will show on mouse enter.</span>
    </Tooltip>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title:
    'Distinctively monetize cost effective networks for cross-media bandwidth',
  visible: false,
  placement: 'top',
};
