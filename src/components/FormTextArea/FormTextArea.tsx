import { Form, Input } from 'antd';
import { useField } from 'formik';
import { FormItemProps } from 'antd/lib/form/FormItem';
import { TextAreaProps } from 'antd/lib/input/TextArea';

type FormTextAreaProps<T> = {
  name: keyof T;
  formItemProps?: FormItemProps;
  textAreaProps?: TextAreaProps;
};

const FormTextArea = <FormFields extends Record<string, unknown>>({
  textAreaProps,
  formItemProps,
  name,
}: FormTextAreaProps<FormFields>) => {
  const [input, meta] = useField(String(name));

  return (
    <Form.Item
      validateStatus={meta.error && meta.touched ? 'error' : undefined}
      help={meta.error && meta.touched ? meta.error : undefined}
      htmlFor={String(name)}
      {...formItemProps}
    >
      <Input.TextArea
        id={String(name)}
        value={meta.value}
        name={String(name)}
        onChange={input.onChange}
        onBlur={input.onBlur}
        {...textAreaProps}
      />
    </Form.Item>
  );
};

export default FormTextArea;
