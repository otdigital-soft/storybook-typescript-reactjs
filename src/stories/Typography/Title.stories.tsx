import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Typography } from 'antd';

const { Title } = Typography;

export default {
  title: 'antd/Typography/Title',
  component: Title,
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
    mark: {
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
    level: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'select' },
      defaultValue: 1,
    },
  },
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'The face of the moon was in shadow.',
};
