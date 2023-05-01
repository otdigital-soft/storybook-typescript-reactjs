import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Typography } from 'antd';

const { Text } = Typography;

export default {
  title: 'antd/Typography/Text',
  component: Text,
  argTypes: {
    code: {
      control: 'boolean',
      defaultValue: false,
    },
    copyable: {
      control: 'boolean',
      defaultValue: false,
    },
    delete: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    editable: {
      control: 'boolean',
      defaultValue: false,
    },
    ellipsis: {
      control: 'boolean',
      defaultValue: false,
    },
    keyboard: {
      control: 'boolean',
      defaultValue: false,
    },
    mark: {
      control: 'boolean',
      defaultValue: false,
    },
    strong: {
      control: 'boolean',
      defaultValue: false,
    },
    italic: {
      control: 'boolean',
      defaultValue: false,
    },
    underline: {
      control: 'boolean',
      defaultValue: false,
    },
    type: {
      options: ['secondary', 'success', 'warning', 'danger'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'The face of the moon was in shadow.',
};
