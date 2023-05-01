import { Form, Checkbox } from 'antd';
import { useField } from 'formik';
import { FormItemProps } from 'antd/lib/form/FormItem';
import {
  CheckboxGroupProps,
  CheckboxOptionType,
} from 'antd/lib/checkbox/Group';

type FormCheckboxGroupProps<T> = {
  name: keyof T;
  formItemProps?: FormItemProps;
  checkboxGroupProps?: Omit<CheckboxGroupProps, 'children' | 'options'>;
  options?: CheckboxOptionType[];
  children?: JSX.Element;
};

const FormCheckboxGroup = <FormFields extends Record<string, unknown>>({
  checkboxGroupProps,
  formItemProps,
  name,
  options,
  children,
}: FormCheckboxGroupProps<FormFields>) => {
  const [, meta, helpers] = useField(String(name));

  return (
    <Form.Item
      validateStatus={meta.error && meta.touched ? 'error' : undefined}
      help={meta.error && meta.touched ? meta.error : undefined}
      htmlFor={String(name)}
      {...formItemProps}
    >
      <Checkbox.Group
        name={String(name)}
        value={meta.value}
        onChange={(checkedValue) => {
          helpers.setTouched(true);
          helpers.setValue(checkedValue);
        }}
        options={options}
        style={{
          width: '100%',
        }}
        {...checkboxGroupProps}
      >
        {children}
      </Checkbox.Group>
    </Form.Item>
  );
};

export default FormCheckboxGroup;
