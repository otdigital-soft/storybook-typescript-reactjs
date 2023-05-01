import FormDatePicker from 'components/FormDatePicker';
import FormInput from 'components/FormInput';
import FormInputNumber from 'components/FormInputNumber';
import FormSelect from 'components/FormSelect';
import {
  DESIGN_SCORE_OPTIONS,
  DRILLFLOOR_EFFICIENCY_OPTIONS,
  DRILLSHIP_LABELS as labels,
  EQUIPMENT_LOAD_OPTIONS,
  RIG_STATUS_OPTIONS,
  TOPSIDE_DESIGN_OPTIONS,
} from 'consts/rigs';
import { FormValues } from 'containers/UpdateDrillshipForm/form';
import { prettyPlaceholder, toLowerCaseFirstLetter } from 'utils/format';

const GeneralInformationForm = () => {
  return (
    <>
      <FormInput<FormValues>
        name="manager"
        formItemProps={{ label: labels.manager }}
        inputProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(labels.manager)}`,
        }}
      />
      <FormInput<FormValues>
        name="design"
        formItemProps={{ label: labels.design }}
        inputProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(labels.design)}`,
        }}
      />
      <FormInput<FormValues>
        name="build_yard"
        formItemProps={{ label: labels.build_yard }}
        inputProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(labels.build_yard)}`,
        }}
      />
      <FormSelect<FormValues>
        name="rig_status"
        formItemProps={{ label: labels.rig_status }}
        options={RIG_STATUS_OPTIONS}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(labels.rig_status)}`,
        }}
      />
      <FormDatePicker<FormValues>
        name="delivery_date"
        formItemProps={{ label: labels.delivery_date }}
        datePickerProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(labels.delivery_date)}`,
        }}
      />
      <FormDatePicker<FormValues>
        name="special_survey_due"
        formItemProps={{ label: labels.special_survey_due }}
        datePickerProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.special_survey_due,
          )}`,
        }}
      />
      <FormDatePicker<FormValues>
        name="end_of_last_contract"
        formItemProps={{ label: labels.end_of_last_contract }}
        datePickerProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.end_of_last_contract,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="months_in_operation_last_year"
        formItemProps={{
          label: labels.months_in_operation_last_year,
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.months_in_operation_last_year,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="months_in_operation_last_3_years"
        formItemProps={{
          label: labels.months_in_operation_last_3_years,
        }}
        inputNumberProps={{
          placeholder: `Enter ${toLowerCaseFirstLetter(
            labels.months_in_operation_last_3_years,
          )}`,
        }}
      />
      <FormSelect<FormValues>
        name="design_score"
        formItemProps={{ label: labels.design_score }}
        options={DESIGN_SCORE_OPTIONS}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(labels.design_score)}`,
        }}
      />
      <FormSelect<FormValues>
        name="equipment_load"
        formItemProps={{ label: labels.equipment_load }}
        options={EQUIPMENT_LOAD_OPTIONS}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(
            labels.equipment_load,
          )}`,
        }}
      />
      <FormSelect<FormValues>
        name="topside_design"
        formItemProps={{ label: labels.topside_design }}
        options={TOPSIDE_DESIGN_OPTIONS}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(
            labels.topside_design,
          )}`,
        }}
      />
      <FormSelect<FormValues>
        name="drillfloor_efficiency"
        formItemProps={{ label: labels.drillfloor_efficiency }}
        options={DRILLFLOOR_EFFICIENCY_OPTIONS}
        selectInputProps={{
          placeholder: `Select ${toLowerCaseFirstLetter(
            labels.drillfloor_efficiency,
          )}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="day_rate"
        formItemProps={{
          label: labels.day_rate,
        }}
        inputNumberProps={{
          placeholder: prettyPlaceholder`Enter ${labels.day_rate}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="spread_cost"
        formItemProps={{
          label: labels.spread_cost,
        }}
        inputNumberProps={{
          placeholder: prettyPlaceholder`Enter ${labels.spread_cost}`,
        }}
      />
      <FormInputNumber<FormValues>
        name="tugs_no_used"
        formItemProps={{
          label: labels.tugs_no_used,
        }}
        inputNumberProps={{
          placeholder: prettyPlaceholder`Enter ${labels.tugs_no_used}`,
        }}
      />
    </>
  );
};

export default GeneralInformationForm;
