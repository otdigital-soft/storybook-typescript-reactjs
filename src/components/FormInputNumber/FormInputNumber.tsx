import { InputNumber, InputNumberProps } from 'antd';
import { useField } from 'formik';
import { parsePrettyNumber, prettyNumber } from 'utils/format';
import { FormItem, FormItemProps } from 'components/Form';

type FormInputNumberProps<T> = {
  name: keyof T;
  formItemProps?: FormItemProps;
  inputNumberProps?: InputNumberProps;
  className?: string;
};

const FormInputNumber = <FormFields extends Record<string, unknown>>({
  inputNumberProps,
  formItemProps,
  name,
  className,
}: FormInputNumberProps<FormFields>) => {
  const [, meta, helpers] = useField(String(name));
  return (
    <FormItem
      validateStatus={meta.error && meta.touched ? 'error' : undefined}
      help={meta.error && meta.touched ? meta.error : undefined}
      className={className}
      htmlFor={String(name)}
      {...formItemProps}
    >
      <InputNumber
        formatter={(value) => prettyNumber(value)}
        parser={(value) => (value ? parsePrettyNumber(value) : '')}
        style={{ width: '100%' }}
        id={String(name)}
        value={meta.value}
        name={String(name)}
        onChange={helpers.setValue}
        onBlur={() => helpers.setTouched(true)}
        {...inputNumberProps}
      />
    </FormItem>
  );
};

export default FormInputNumber;
