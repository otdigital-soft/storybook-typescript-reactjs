import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Form, Input } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { SearchProps } from 'antd/lib/input/Search';

export default {
  title: 'antd/Input/Search',
  component: Input.Search,
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
      defaultValue: 'Search',
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    enterButton: {
      control: 'text',
    },
    loading: {
      control: 'boolean',
      defaultValue: false,
    },
  },
} as ComponentMeta<typeof Input.Search>;

const Template: ComponentStory<typeof Input.Search> = (
  args: SearchProps & Pick<FormItemProps, 'validateStatus' | 'label'>,
) => {
  const { validateStatus, label, ...searchProps } = args;
  return (
    <Form>
      <Form.Item validateStatus={validateStatus} label={label}>
        <Input.Search {...searchProps} />
      </Form.Item>
    </Form>
  );
};

export const Default = Template.bind({});
Default.args = {};
