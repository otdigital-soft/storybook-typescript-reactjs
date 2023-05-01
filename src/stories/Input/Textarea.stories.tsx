import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Form, Input } from 'antd';
import { TextAreaProps } from 'antd/lib/input';
import { FormItemProps } from 'antd/lib/form/FormItem';

export default {
  title: 'antd/Input/TextArea',
  component: Input.TextArea,
  argTypes: {
    validateStatus: {
      options: ['success', 'warning', 'error', 'validating'],
      control: { type: 'select' },
      defaultValue: 'middle',
    },
    label: {
      control: 'text',
    },
    size: {
      options: ['large', 'middle', 'small'],
      control: { type: 'select' },
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Textarea placeholder',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    showCount: {
      control: 'boolean',
      defaultValue: false,
    },
    bordered: {
      control: 'boolean',
      defaultValue: true,
    },
    autoSize: {
      control: 'boolean',
      defaultValue: false,
    },
    allowClear: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Input.TextArea>;

const Template: ComponentStory<typeof Input.TextArea> = (
  args: TextAreaProps & Pick<FormItemProps, 'validateStatus' | 'label'>,
) => {
  const { validateStatus, label, ...textAreaProps } = args;
  return (
    <Form>
      <Form.Item validateStatus={validateStatus} label={label}>
        <Input.TextArea {...textAreaProps} />
      </Form.Item>
    </Form>
  );
};

export const Default = Template.bind({});
Default.args = {};
