import { Form, Radio } from 'antd';
import { useField } from 'formik';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { CheckboxOptionType } from 'antd/lib/checkbox/Group';
import { RadioGroupProps } from 'antd/lib/radio/interface';

type FormRadioGroupProps<T> = {
  name: keyof T;
  formItemProps?: FormItemProps;
  radioGroupProps?: Omit<RadioGroupProps, 'children' | 'options'>;
  options: CheckboxOptionType[];
};

const FormRadioGroup = <FormFields extends Record<string, unknown>>({
  radioGroupProps,
  formItemProps,
  name,
  options,
}: FormRadioGroupProps<FormFields>) => {
  const [, meta, helpers] = useField(String(name));

  return (
    <Form.Item
      validateStatus={meta.error && meta.touched ? 'error' : undefined}
      help={meta.error && meta.touched ? meta.error : undefined}
      htmlFor={String(name)}
      {...formItemProps}
    >
      <Radio.Group
        name={String(name)}
        value={meta.value}
        onChange={(e) => {
          helpers.setTouched(true);
          helpers.setValue(e.target.value);
        }}
        options={options}
        {...radioGroupProps}
      />
    </Form.Item>
  );
};

export default FormRadioGroup;
