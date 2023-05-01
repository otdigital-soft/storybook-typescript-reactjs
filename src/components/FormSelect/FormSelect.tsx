import { Form, Select, SelectProps } from 'antd';
import { useField } from 'formik';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { DefaultOptionType } from 'rc-select/lib/Select';

export type FormSelectProps<T> = {
  name: keyof T;
  formItemProps?: FormItemProps;
  selectInputProps?: Omit<SelectProps, 'children' | 'options'>;
  options: DefaultOptionType[];
  className?: string;
};

const FormSelect = <FormFields extends Record<string, unknown>>({
  selectInputProps,
  formItemProps,
  name,
  options,
  className,
}: FormSelectProps<FormFields>) => {
  const [, meta, helpers] = useField(String(name));

  return (
    <Form.Item
      validateStatus={meta.error && meta.touched ? 'error' : undefined}
      help={meta.error && meta.touched ? meta.error : undefined}
      htmlFor={String(name)}
      className={className}
      {...formItemProps}
    >
      <Select
        id={String(name)}
        value={meta.value}
        onChange={(value) => {
          helpers.setValue(value !== undefined ? value : null);
        }}
        onBlur={() => helpers.setTouched(true)}
        style={{ width: '100%' }}
        options={options}
        {...selectInputProps}
      />
    </Form.Item>
  );
};

export default FormSelect;
