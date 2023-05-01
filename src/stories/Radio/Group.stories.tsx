import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Radio } from 'antd';

export default {
  title: 'antd/Radio/Group',
  component: Radio.Group,
  argTypes: {
    onChange: { action: 'on change' },
    disabled: {
      control: 'boolean',
    },
    buttonStyle: {
      options: ['outline', 'solid'],
      control: { type: 'select' },
    },
    size: {
      options: ['large', 'middle', 'small'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof Radio.Group>;

const Template: ComponentStory<typeof Radio.Group> = (args) => (
  <Radio.Group {...args}>
    <Radio.Button value="a" type="primary">
      Hangzhou
    </Radio.Button>
    <Radio.Button value="b" disabled>
      Shanghai
    </Radio.Button>
    <Radio.Button value="c">Beijing</Radio.Button>
    <Radio.Button value="d">Chengdu</Radio.Button>
  </Radio.Group>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Default',
  disabled: false,
  buttonStyle: 'outline',
  size: 'middle',
};
