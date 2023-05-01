import { ComponentStory, ComponentMeta } from '@storybook/react';
import Tag from 'components/Tag';

export default {
  title: 'antd/Tag/CheckableTag',
  component: Tag.CheckableTag,
  argTypes: {
    checked: {
      control: 'boolean',
    },
  },
} as ComponentMeta<typeof Tag.CheckableTag>;

const Template: ComponentStory<typeof Tag.CheckableTag> = (args) => (
  <Tag.CheckableTag {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'Tag',
  checked: false,
};
