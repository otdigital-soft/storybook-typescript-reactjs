import FormInputNumber from 'components/FormInputNumber';
import FormSelect from 'components/FormSelect';
import { MUD_TYPE_OPTIONS, WELL_LABELS as labels } from 'consts/wells';
import { FormValues } from 'containers/UpdateWellForm/types';
import { toLowerCaseFirstLetter } from 'utils/format';

const DrillingSettingsForm = () => {
  return (
    <>
      <FormInputNumber<FormValues>
        name="planned_time_per_well"
        formItemProps={{
          label: labels.planned_time_per_well,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.planned_time_per_well,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="md_from_msl"
        formItemProps={{
          label: labels.md_from_msl,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${labels.md_from_msl}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="expected_reservoir_pressure"
        formItemProps={{
          label: labels.expected_reservoir_pressure,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.expected_reservoir_pressure,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="expected_reservoir_temperature"
        formItemProps={{
          label: labels.expected_reservoir_temperature,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.expected_reservoir_temperature,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="top_hole_section_hole_size"
        formItemProps={{
          label: labels.top_hole_section_hole_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.top_hole_section_hole_size,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="surface_casing_section_hole_size"
        formItemProps={{
          label: labels.surface_casing_section_hole_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.surface_casing_section_hole_size,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="intermediate_casing_section_hole_size"
        formItemProps={{
          label: labels.intermediate_casing_section_hole_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.intermediate_casing_section_hole_size,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="production_casing_section_hole_size"
        formItemProps={{
          label: labels.production_casing_section_hole_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.production_casing_section_hole_size,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="extension_section_hole_size"
        formItemProps={{
          label: labels.extension_section_hole_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.extension_section_hole_size,
          )}`,
        }}
      />
      <FormSelect<FormValues>
        name="intermediate_casing_section_mud_type"
        options={MUD_TYPE_OPTIONS}
        formItemProps={{
          label: labels.intermediate_casing_section_mud_type,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        selectInputProps={{
          allowClear: true,
          placeholder: `Select ${toLowerCaseFirstLetter(
            labels.intermediate_casing_section_mud_type,
          )}`,
        }}
      />
      <FormSelect<FormValues>
        name="production_casing_section_mud_type"
        options={MUD_TYPE_OPTIONS}
        formItemProps={{
          label: labels.production_casing_section_mud_type,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        selectInputProps={{
          allowClear: true,
          placeholder: `Select ${toLowerCaseFirstLetter(
            labels.production_casing_section_mud_type,
          )}`,
        }}
      />
      <FormSelect<FormValues>
        name="extension_section_mud_type"
        options={MUD_TYPE_OPTIONS}
        formItemProps={{
          label: labels.extension_section_mud_type,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        selectInputProps={{
          allowClear: true,
          placeholder: `Select ${toLowerCaseFirstLetter(
            labels.extension_section_mud_type,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="intermediate_casing_section_mud_density"
        formItemProps={{
          label: labels.intermediate_casing_section_mud_density,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.intermediate_casing_section_mud_density,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="production_casing_section_mud_density"
        formItemProps={{
          label: labels.production_casing_section_mud_density,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.production_casing_section_mud_density,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="extension_section_mud_density"
        formItemProps={{
          label: labels.extension_section_mud_density,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.extension_section_mud_density,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="conductor_size"
        formItemProps={{
          label: labels.conductor_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(labels.conductor_size)}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="conductor_weight"
        formItemProps={{
          label: labels.conductor_weight,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.conductor_weight,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="conductor_tvd_shoe_depth"
        formItemProps={{
          label: labels.conductor_tvd_shoe_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.conductor_tvd_shoe_depth,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="conductor_md_shoe_depth"
        formItemProps={{
          label: labels.conductor_md_shoe_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.conductor_md_shoe_depth,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="surface_casing_size"
        formItemProps={{
          label: labels.surface_casing_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.surface_casing_size,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="surface_casing_weight"
        formItemProps={{
          label: labels.surface_casing_weight,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.surface_casing_weight,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="surface_casing_tvd_shoe_depth"
        formItemProps={{
          label: labels.surface_casing_tvd_shoe_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.surface_casing_tvd_shoe_depth,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="surface_casing_md_shoe_depth"
        formItemProps={{
          label: labels.surface_casing_md_shoe_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.surface_casing_md_shoe_depth,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="intermediate_casing_size"
        formItemProps={{
          label: labels.intermediate_casing_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.intermediate_casing_size,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="intermediate_casing_weight"
        formItemProps={{
          label: labels.intermediate_casing_weight,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.intermediate_casing_weight,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="intermediate_casing_tvd_shoe_depth"
        formItemProps={{
          label: labels.intermediate_casing_tvd_shoe_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.intermediate_casing_tvd_shoe_depth,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="intermediate_casing_md_shoe_depth"
        formItemProps={{
          label: labels.intermediate_casing_md_shoe_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.intermediate_casing_md_shoe_depth,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="production_casing_size"
        formItemProps={{
          label: labels.production_casing_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.production_casing_size,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="production_casing_weight"
        formItemProps={{
          label: labels.production_casing_weight,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.production_casing_weight,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="production_casing_tvd_shoe_depth"
        formItemProps={{
          label: labels.production_casing_tvd_shoe_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.production_casing_tvd_shoe_depth,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="production_casing_md_shoe_depth"
        formItemProps={{
          label: labels.production_casing_md_shoe_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.production_casing_md_shoe_depth,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="liner_other_size"
        formItemProps={{
          label: labels.liner_other_size,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.liner_other_size,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="liner_other_weight"
        formItemProps={{
          label: labels.liner_other_weight,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.liner_other_weight,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="liner_other_tvd_shoe_depth"
        formItemProps={{
          label: labels.liner_other_tvd_shoe_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.liner_other_tvd_shoe_depth,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="liner_other_md_shoe_depth"
        formItemProps={{
          label: labels.liner_other_md_shoe_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.liner_other_md_shoe_depth,
          )}`,
        }}
      />
    </>
  );
};
export default DrillingSettingsForm;
