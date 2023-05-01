import { SwitchProps, FormItemProps } from 'antd';
import Switch from 'components/Switch';
import { useField } from 'formik';
import { yesNoFormatter } from 'utils/format';
import { FormSwitchLabel, FormSwitchItem } from './FormSwitch.styled';

interface FormSwitchProps<T> {
  name: keyof T;
  switchProps?: SwitchProps;
  formItemProps?: FormItemProps;
}

const FormSwitch = <FormFields extends Record<string, unknown>>({
  name,
  formItemProps,
  switchProps,
}: FormSwitchProps<FormFields>) => {
  const [, meta, helpers] = useField(String(name));

  const handleChange = (value: boolean) => {
    helpers.setValue(value);
  };

  return (
    <FormSwitchItem {...formItemProps} htmlFor={String(name)}>
      <FormSwitchLabel>{yesNoFormatter(meta.value)}</FormSwitchLabel>
      <Switch
        id={String(name)}
        size="small"
        checked={meta.value}
        onChange={handleChange}
        {...switchProps}
      />
    </FormSwitchItem>
  );
};

export default FormSwitch;
