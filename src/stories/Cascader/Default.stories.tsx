import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Cascader } from 'antd';

export default {
  title: 'antd/Cascader',
  component: Cascader,
  argTypes: {
    onChange: { action: 'on change' },
    placeholder: {
      control: { type: 'text' },
      defaultValue: 'Cascader',
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
} as ComponentMeta<typeof Cascader>;

const Template: ComponentStory<typeof Cascader> = (args) => (
  <Cascader style={{ width: 320 }} {...args} />
);

export const Default = Template.bind({});
Default.args = {
  options: [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ],
};
