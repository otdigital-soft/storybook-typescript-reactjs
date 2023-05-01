import { Checkbox, CheckboxProps } from 'antd';
import { useField } from 'formik';
import { FormItem, FormItemProps } from 'components/Form';

type FormCheckboxProps<T> = {
  name: keyof T;
  formItemProps?: FormItemProps;
  className?: string;
  checkboxProps?: CheckboxProps;
  children?: React.ReactNode;
};

const FormCheckbox = <FormFields extends Record<string, unknown>>({
  checkboxProps,
  formItemProps,
  name,
  className,
  children,
}: FormCheckboxProps<FormFields>) => {
  const [, meta, helpers] = useField(String(name));

  return (
    <FormItem
      validateStatus={meta.error && meta.touched ? 'error' : undefined}
      help={meta.error && meta.touched ? meta.error : undefined}
      className={className}
      htmlFor={String(name)}
      {...formItemProps}
    >
      <Checkbox
        id={String(name)}
        checked={meta.value}
        name={String(name)}
        onChange={(event) => {
          helpers.setTouched(true);
          helpers.setValue(event.target.checked);
        }}
        {...checkboxProps}
      >
        {children}
      </Checkbox>
    </FormItem>
  );
};

export default FormCheckbox;
