import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AutoComplete } from 'antd';

export default {
  title: 'antd/AutoComplete',
  component: AutoComplete,
  argTypes: {
    onSelect: { action: 'on select' },
    onSearch: { action: 'on search' },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Autocomplete input',
    },
    open: {
      control: 'boolean',
    },
    size: {
      options: ['small', 'middle', 'large'],
      control: { type: 'select' },
      defaultValue: 'middle',
    },
  },
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<typeof AutoComplete> = (args) => (
  <AutoComplete style={{ width: 320 }} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  options: [
    {
      value: 'Select menu item #1',
    },
    {
      value: 'Select menu item #2',
    },
    {
      value: 'Select menu item #3',
    },
  ],
};
