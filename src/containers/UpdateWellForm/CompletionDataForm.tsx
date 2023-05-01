import FormInputNumber from 'components/FormInputNumber';
import { WELL_LABELS as labels } from 'consts/wells';
import { FormValues } from 'containers/UpdateWellForm/types';
import { toLowerCaseFirstLetter } from 'utils/format';

const CompletionDataForm = () => {
  return (
    <>
      <FormInputNumber<FormValues>
        name="no_well_to_be_completed"
        formItemProps={{
          label: labels.no_well_to_be_completed,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.no_well_to_be_completed,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="planned_time_per_completion_operation"
        formItemProps={{
          label: labels.planned_time_per_completion_operation,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.planned_time_per_completion_operation,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="subsea_xmas_tree_size"
        formItemProps={{
          label: labels.subsea_xmas_tree_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.subsea_xmas_tree_size,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="xt_weight"
        formItemProps={{
          label: labels.xt_weight,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${labels.xt_weight}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="lrp_size"
        formItemProps={{
          label: labels.lrp_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${labels.lrp_size}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="lrp_weight"
        formItemProps={{
          label: labels.lrp_weight,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${labels.lrp_weight}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="xt_running_tool_size"
        formItemProps={{
          label: labels.xt_running_tool_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${labels.xt_running_tool_size}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="xt_running_tool_weight"
        formItemProps={{
          label: labels.xt_running_tool_weight,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${labels.xt_running_tool_weight}`,
        }}
      />
    </>
  );
};

export default CompletionDataForm;
