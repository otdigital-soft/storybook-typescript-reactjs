import FormInputNumber from 'components/FormInputNumber';
import FormSelect from 'components/FormSelect';
import {
  COMPLETION_OPTIONS,
  METOCEAN_DATA_OPTIONS,
  PNA_OPTIONS,
  RESERVOIR_SECTION_OPTIONS,
  SEASON_OPTIONS,
  TOP_HOLE_OPTIONS,
  TRANSPORT_SECTION_OPTIONS,
  WELL_LABELS as labels,
  WELL_TYPE_OPTIONS,
} from 'consts/wells';
import { FormValues } from 'containers/UpdateWellForm/types';
import { toLowerCaseFirstLetter } from 'utils/format';

const GeneralForm = () => {
  return (
    <>
      <FormInputNumber<FormValues>
        name="water_depth"
        formItemProps={{
          label: labels.water_depth,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(labels.water_depth)}`,
        }}
      />
      <FormSelect<FormValues>
        name="type"
        formItemProps={{
          label: labels.type,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        options={WELL_TYPE_OPTIONS}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(labels.type)}`,
        }}
      />
      <FormSelect<FormValues>
        name="top_hole"
        options={TOP_HOLE_OPTIONS}
        formItemProps={{
          label: labels.top_hole,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(labels.top_hole)}`,
        }}
      />
      <FormSelect<FormValues>
        name="transport_section"
        options={TRANSPORT_SECTION_OPTIONS}
        formItemProps={{
          label: labels.transport_section,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(
            labels.transport_section,
          )}`,
        }}
      />
      <FormSelect<FormValues>
        name="reservoir_section"
        options={RESERVOIR_SECTION_OPTIONS}
        formItemProps={{
          label: labels.reservoir_section,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(
            labels.reservoir_section,
          )}`,
        }}
      />
      <FormSelect<FormValues>
        name="completion"
        options={COMPLETION_OPTIONS}
        formItemProps={{
          label: labels.completion,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(labels.completion)}`,
        }}
      />
      <FormSelect<FormValues>
        name="pna"
        options={PNA_OPTIONS}
        formItemProps={{
          label: labels.pna,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        selectInputProps={{
          placeholder: `Select ${labels.pna}`,
        }}
      />
      <FormSelect<FormValues>
        name="season"
        options={SEASON_OPTIONS}
        formItemProps={{
          label: labels.season,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(labels.season)}`,
        }}
      />
      <FormSelect<FormValues>
        name="metocean_data"
        options={METOCEAN_DATA_OPTIONS}
        formItemProps={{
          label: labels.metocean_data,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(labels.metocean_data)}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="metocean_days_above_hs_5"
        formItemProps={{
          label: labels.metocean_days_above_hs_5,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.metocean_days_above_hs_5,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="tvd_from_msl"
        formItemProps={{
          label: labels.tvd_from_msl,
          labelCol: {
            span: 12,
          },
          labelAlign: 'left',
        }}
        inputNumberProps={{
          placeholder: `Enter ${labels.tvd_from_msl}`,
        }}
      />
    </>
  );
};

export default GeneralForm;
