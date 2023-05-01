import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { PasswordProps } from 'antd/lib/input/Password';

export default {
  title: 'antd/Input/Password',
  component: Input.Password,
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
      defaultValue: 'Password',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    visibilityToggle: {
      control: 'boolean',
      defaultValue: true,
    },
  },
} as ComponentMeta<typeof Input.Password>;

const Template: ComponentStory<typeof Input.Password> = (
  args: PasswordProps & Pick<FormItemProps, 'validateStatus' | 'label'>,
) => {
  const { validateStatus, label, ...passwordProps } = args;
  return (
    <Form>
      <Form.Item validateStatus={validateStatus} label={label}>
        <Input.Password {...passwordProps} />
      </Form.Item>
    </Form>
  );
};

export const Default = Template.bind({});
Default.args = {};
