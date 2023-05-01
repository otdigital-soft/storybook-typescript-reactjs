import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SearchOutlined } from '@ant-design/icons';
import Button from './Button';

export default {
  title: 'antd/Button',
  component: Button,
  argTypes: {
    type: {
      options: [
        'primary',
        'dashed',
        'text',
        'link',
        'default',
        'ghost',
        'success',
      ],
      control: { type: 'select' },
      defaultValue: 'default',
    },
    size: {
      options: ['large', 'middle', 'small'],
      control: { type: 'select' },
      defaultValue: 'middle',
    },
    shape: {
      options: ['default', 'circle', 'round'],
      control: { type: 'select' },
      defaultValue: 'default',
    },
    danger: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
    ghost: {
      control: 'boolean',
      defaultValue: false,
    },
    block: {
      control: 'boolean',
      defaultValue: false,
    },
    icon: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <SearchOutlined />,
        false: undefined,
      },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
};
