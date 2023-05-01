import { Form } from 'antd';
import { FormItemProps } from 'antd/lib/form/FormItem';
import DatePicker, { DatePickerProps } from 'components/DatePicker';
import { useField } from 'formik';
import { DATE_FORMAT_WITH_DOTS } from 'consts';

type FormDatePickerProps<T> = {
  name: keyof T;
  formItemProps?: FormItemProps;
  datePickerProps?: DatePickerProps;
  className?: string;
};

const FormDatePicker = <FormFields extends Record<string, unknown>>({
  datePickerProps,
  formItemProps,
  name,
  className,
}: FormDatePickerProps<FormFields>) => {
  const [input, meta, helpers] = useField<Date | null>(String(name));

  return (
    <Form.Item
      validateStatus={meta.error && meta.touched ? 'error' : undefined}
      help={meta.error && meta.touched ? meta.error : undefined}
      htmlFor={String(name)}
      className={className}
      {...formItemProps}
    >
      <DatePicker
        id={String(name)}
        value={meta.value}
        name={String(name)}
        onBlur={input.onBlur}
        onChange={(value) => helpers.setValue(value)}
        style={{ width: '100%' }}
        format={DATE_FORMAT_WITH_DOTS}
        {...datePickerProps}
      />
    </Form.Item>
  );
};

export default FormDatePicker;
