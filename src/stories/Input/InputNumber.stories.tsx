import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Form, InputNumber, InputNumberProps } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { UserOutlined } from '@ant-design/icons';

export default {
  title: 'antd/Input/InputNumber',
  component: InputNumber,
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
      defaultValue: 'Number placeholder',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    addonBefore: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <UserOutlined />,
        false: undefined,
      },
    },
    addonAfter: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <UserOutlined />,
        false: undefined,
      },
    },
  },
} as ComponentMeta<typeof InputNumber>;

const Template: ComponentStory<typeof InputNumber> = (
  args: InputNumberProps & Pick<FormItemProps, 'validateStatus' | 'label'>,
) => {
  const { validateStatus, label, ...inputNumberProps } = args;
  return (
    <Form>
      <Form.Item validateStatus={validateStatus} label={label}>
        <InputNumber {...inputNumberProps} style={{ width: '100%' }} />
      </Form.Item>
    </Form>
  );
};

export const Default = Template.bind({});
Default.args = {};
