import { Input } from 'antd';
import { useField } from 'formik';
import { InputProps } from 'antd/lib/input/Input';
import { FormItem, FormItemProps } from 'components/Form';

type FormInputProps<T> = {
  name: keyof T;
  formItemProps?: FormItemProps;
  inputProps?: InputProps;
  className?: string;
};

const FormInput = <FormFields extends Record<string, unknown>>({
  inputProps,
  formItemProps,
  name,
  className,
}: FormInputProps<FormFields>) => {
  const [input, meta] = useField(String(name));
  return (
    <FormItem
      validateStatus={meta.error && meta.touched ? 'error' : undefined}
      help={meta.error && meta.touched ? meta.error : undefined}
      className={className}
      htmlFor={String(name)}
      {...formItemProps}
    >
      <Input
        id={String(name)}
        value={meta.value}
        name={String(name)}
        onChange={input.onChange}
        onBlur={input.onBlur}
        {...inputProps}
      />
    </FormItem>
  );
};

export default FormInput;
