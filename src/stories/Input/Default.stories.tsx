import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Form, FormProps, Input, InputProps } from 'antd';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { FormItemProps } from 'antd/lib/form/FormItem';

export default {
  title: 'antd/Input',
  component: Form,
  argTypes: {
    labelAlign: {
      options: ['left', 'right'],
      control: { type: 'select' },
      defaultValue: 'right',
    },
    required: {
      control: 'boolean',
      defaultValue: false,
    },
    requiredMark: {
      control: 'boolean',
      defaultValue: true,
    },
    validateStatus: {
      options: ['success', 'warning', 'error', 'validating'],
      control: { type: 'select' },
      defaultValue: 'middle',
    },
    label: {
      control: 'text',
    },
    tooltip: {
      control: 'text',
    },
    help: {
      control: 'text',
    },
    extra: {
      control: 'text',
    },
    hasFeedback: {
      control: 'boolean',
    },
    size: {
      options: ['large', 'middle', 'small'],
      control: { type: 'select' },
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
    prefix: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <UserOutlined />,
        false: undefined,
      },
    },
    suffix: {
      control: 'boolean',
      defaultValue: false,
      mapping: {
        true: <InfoCircleOutlined />,
        false: undefined,
      },
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Input placeholder',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (
  args: InputProps &
    Pick<FormProps, 'size' | 'requiredMark'> &
    Pick<
      FormItemProps,
      | 'validateStatus'
      | 'labelAlign'
      | 'required'
      | 'label'
      | 'tooltip'
      | 'help'
      | 'extra'
      | 'hasFeedback'
    >,
) => {
  const { size, requiredMark, ...nonFormProps } = args;
  const {
    validateStatus,
    labelAlign,
    required,
    label,
    tooltip,
    help,
    extra,
    hasFeedback,
    ...inputProps
  } = nonFormProps;
  return (
    <Form size={size} requiredMark={requiredMark}>
      <Form.Item
        validateStatus={validateStatus}
        labelAlign={labelAlign}
        required={required}
        label={label}
        tooltip={tooltip}
        help={help}
        extra={extra}
        hasFeedback={hasFeedback}
      >
        <Input {...inputProps} />
      </Form.Item>
    </Form>
  );
};

export const Default = Template.bind({});
Default.args = {};
