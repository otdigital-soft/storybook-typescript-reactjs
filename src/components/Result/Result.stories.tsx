import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SmileOutlined } from '@ant-design/icons';
import Result from 'components/Result';

export default {
  title: 'antd/Result',
  component: Result,
  argTypes: {
    status: {
      options: ['success', 'error', 'info', 'warning', '404', '403', '500'],
      control: { type: 'select' },
    },
    extra: {
      control: { type: 'text' },
    },
    icon: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <SmileOutlined />,
        false: undefined,
      },
    },
  },
} as ComponentMeta<typeof Result>;

const Template: ComponentStory<typeof Result> = (args) => <Result {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Test title',
  subTitle: 'Test sub title',
  status: 'info',
};
