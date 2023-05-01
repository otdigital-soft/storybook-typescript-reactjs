import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button, Checkbox, Form, Input } from 'antd';

export default {
  title: 'antd/Form',
  component: Form,
  argTypes: {
    labelAlign: {
      options: ['left', 'right'],
      control: { type: 'select' },
      defaultValue: 'right',
    },
    labelWrap: {
      control: 'boolean',
      defaultValue: false,
    },
    requiredMark: {
      control: 'boolean',
      defaultValue: true,
    },
    layout: {
      options: ['horizontal', 'vertical', 'inline'],
      control: { type: 'select' },
      defaultValue: 'horizontal',
    },
    size: {
      options: ['small', 'middle', 'large'],
      control: { type: 'select' },
      defaultValue: 'middle',
    },
  },
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => (
  <Form {...args}>
    <Form.Item
      name="input1"
      label="Input Label"
      rules={[{ required: true }]}
      tooltip="This is a required field"
    >
      <Input placeholder="Input placeholder" />
    </Form.Item>
    <Form.Item
      name="input2"
      label="Input Label"
      rules={[{ required: true }]}
      tooltip="This is a required field"
    >
      <Input placeholder="Input placeholder" />
    </Form.Item>
    <Form.Item
      name="input3"
      label="Input Label"
      rules={[{ required: true }]}
      tooltip="This is a required field"
    >
      <Input placeholder="Input placeholder" />
    </Form.Item>
    <Form.Item
      name="input4"
      label="Input Label"
      rules={[{ required: true }]}
      tooltip="This is a required field"
    >
      <Input placeholder="Input placeholder" />
    </Form.Item>
    <Form.Item name="input5" rules={[{ required: true }]}>
      <Input placeholder="Input placeholder" />
    </Form.Item>
    <Form.Item
      name="checkbox"
      valuePropName="checked"
      rules={[{ required: true }]}
    >
      <Checkbox>Checkbox</Checkbox>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
);

export const Default = Template.bind({});
Default.args = {};
