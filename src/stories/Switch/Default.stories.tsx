import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Switch } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export default {
  title: 'antd/Switch',
  component: Switch,
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
    size: {
      options: ['default', 'small'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
    checkedChildren: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <CheckOutlined />,
        false: undefined,
      },
    },
    unCheckedChildren: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <CloseOutlined />,
        false: undefined,
      },
    },
  },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => <Switch {...args} />;

export const Default = Template.bind({});
Default.args = {};
