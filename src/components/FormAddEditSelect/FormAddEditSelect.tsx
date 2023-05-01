import { Form } from 'antd';
import { useField } from 'formik';
import { FormItemProps } from 'antd/lib/form/FormItem';
import AddEditSelect, {
  AddEditSelectOptionType,
  AddEditSelectProps,
} from 'components/AddEditSelect';

type FormAddEditSelectProps<T> = {
  name: keyof T;
  formItemProps?: FormItemProps;
  addEditSelectInputProps?: Omit<AddEditSelectProps, 'children' | 'options'>;
  options: AddEditSelectOptionType[];
  className?: string;
};

const FormAddEditSelect = <FormFields extends Record<string, unknown>>({
  addEditSelectInputProps,
  formItemProps,
  name,
  options,
  className,
}: FormAddEditSelectProps<FormFields>) => {
  const [, meta, helpers] = useField(String(name));

  return (
    <Form.Item
      validateStatus={meta.error && meta.touched ? 'error' : undefined}
      help={meta.error && meta.touched ? meta.error : undefined}
      htmlFor={String(name)}
      className={className}
      {...formItemProps}
    >
      <AddEditSelect
        id={String(name)}
        value={meta.value}
        onChange={(value) => {
          helpers.setValue(value !== undefined ? value : null);
        }}
        onBlur={() => helpers.setTouched(true)}
        style={{ width: '100%' }}
        options={options}
        {...addEditSelectInputProps}
      />
    </Form.Item>
  );
};

export default FormAddEditSelect;
