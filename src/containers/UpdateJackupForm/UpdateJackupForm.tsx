import { Alert, Button, Col, Form, Input, Row } from 'antd';
import { CustomJackupRigDetails } from 'api/schema';
import Box, { Flexbox } from 'components/Box';
import Divider from 'components/Divider';
import FormDatePicker from 'components/FormDatePicker';
import FormInput from 'components/FormInput';
import FormInputNumber from 'components/FormInputNumber';
import FormSelect from 'components/FormSelect';
import FormSwitch from 'components/FormSwitch';
import { SubmitRow } from 'components/Row';
import { Title } from 'components/Typography';
import {
  DESIGN_SCORE_OPTIONS,
  JACKUP_LABELS as labels,
  RIG_STATUS_OPTIONS,
  TOPSIDE_DESIGN_OPTIONS,
} from 'consts/rigs';
import { Formik } from 'formik';
import useBack from 'hooks/useBack';
import { prettyPlaceholder, toLowerCaseFirstLetter } from 'utils/format';
import useUpdateJackupForm, { FormValues } from './useUpdateJackupForm';
import { emptyValues, getInitialValues } from './utils';

interface UpdateJackupFormProps {
  jackupRigData: CustomJackupRigDetails;
}

const UpdateJackupForm = ({ jackupRigData }: UpdateJackupFormProps) => {
  const { handleBack } = useBack();
  const { schema, onUpdateJackupRig } = useUpdateJackupForm();
  const initialValues: FormValues = getInitialValues(jackupRigData);

  return (
    <Formik
      validationSchema={schema}
      onSubmit={(values, formikHelpers) =>
        onUpdateJackupRig({ values, formikHelpers })
      }
      initialValues={initialValues}
      validateOnChange={false}
    >
      {({ submitForm, isSubmitting, isValid, setValues, status }) => (
        <>
          <Box marginX={24} marginTop={20} marginBottom={106}>
            {status ? (
              <Box mb="10px">
                <Alert message={status} type="error" showIcon />
              </Box>
            ) : null}
            <Form layout="vertical">
              <Row gutter={35}>
                <Col span={6}>
                  <Form.Item label="Rig type">
                    <Input value={'Jackup'} disabled={true} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <FormInput<FormValues>
                    name="name"
                    formItemProps={{ label: labels.name }}
                    inputProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.name,
                      )}`,
                    }}
                  />
                </Col>
                <Col span={12}>
                  <Flexbox mt="30px" justifyContent="flex-end">
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        setValues(emptyValues, true);
                      }}
                    >
                      Clear data
                    </Button>
                  </Flexbox>
                </Col>
              </Row>
            </Form>
            <Box marginY={30}>
              <Divider />
            </Box>
            <Row gutter={35}>
              <Col span={12}>
                <Box mb="20px">
                  <Title level={5} type="secondary">
                    General information
                  </Title>
                </Box>
                <Form layout="vertical">
                  <FormInput<FormValues>
                    name="manager"
                    formItemProps={{ label: labels.manager }}
                    inputProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.manager,
                      )}`,
                    }}
                  />
                  <FormInput<FormValues>
                    name="design"
                    formItemProps={{ label: labels.design }}
                    inputProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.design,
                      )}`,
                    }}
                  />
                  <FormInput<FormValues>
                    name="build_yard"
                    formItemProps={{ label: labels.build_yard }}
                    inputProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.build_yard,
                      )}`,
                    }}
                  />
                  <FormSelect<FormValues>
                    name="rig_status"
                    formItemProps={{ label: labels.rig_status }}
                    options={RIG_STATUS_OPTIONS}
                    selectInputProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.rig_status,
                      )}`,
                    }}
                  />
                  <FormDatePicker<FormValues>
                    name="delivery_date"
                    formItemProps={{ label: labels.delivery_date }}
                    datePickerProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.delivery_date,
                      )}`,
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
                  <FormInput<FormValues>
                    name="months_in_operation_last_year"
                    formItemProps={{
                      label: labels.months_in_operation_last_year,
                    }}
                    inputProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.months_in_operation_last_year,
                      )}`,
                    }}
                  />
                  <FormInput<FormValues>
                    name="months_in_operation_last_3_years"
                    formItemProps={{
                      label: labels.months_in_operation_last_3_years,
                    }}
                    inputProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.months_in_operation_last_3_years,
                      )}`,
                    }}
                  />
                  <FormSelect<FormValues>
                    name="topside_design"
                    formItemProps={{ label: labels.topside_design }}
                    options={TOPSIDE_DESIGN_OPTIONS}
                    selectInputProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.topside_design,
                      )}`,
                    }}
                  />
                  <FormSelect<FormValues>
                    name="design_score"
                    formItemProps={{ label: labels.design_score }}
                    options={DESIGN_SCORE_OPTIONS}
                    selectInputProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.design_score,
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
                  <FormInputNumber<FormValues>
                    name="jack_up_time"
                    formItemProps={{
                      label: labels.jack_up_time,
                    }}
                    inputNumberProps={{
                      placeholder: prettyPlaceholder`Enter ${labels.jack_up_time}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="jack_down_time"
                    formItemProps={{
                      label: labels.jack_down_time,
                    }}
                    inputNumberProps={{
                      placeholder: prettyPlaceholder`Enter ${labels.jack_down_time}`,
                    }}
                  />
                </Form>
                <Box marginY={30}>
                  <Divider />
                </Box>
                <Form layout="horizontal" colon={false}>
                  <Box mb="20px">
                    <Title level={5} type="secondary">
                      Operation & emission efficiency
                    </Title>
                  </Box>
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.offline_stand_building,
                    }}
                    name="offline_stand_building"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.auto_pipe_handling,
                    }}
                    name="auto_pipe_handling"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.dual_activity,
                    }}
                    name="dual_activity"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.subsea_drilling,
                    }}
                    name="subsea_drilling"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.enhanced_legs,
                    }}
                    name="enhanced_legs"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.drilltronic,
                    }}
                    name="drilltronic"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.dynamic_drilling_guide,
                    }}
                    name="dynamic_drilling_guide"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.process_automation_platform,
                    }}
                    name="process_automation_platform"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.automatic_tripping,
                    }}
                    name="automatic_tripping"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.closed_bus,
                    }}
                    name="closed_bus"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{ label: labels.scr }}
                    name="scr"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.hybrid,
                    }}
                    name="hybrid"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.hvac_heat_recovery,
                    }}
                    name="hvac_heat_recovery"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.freshwater_cooling_systems,
                    }}
                    name="freshwater_cooling_systems"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.seawater_cooling_systems,
                    }}
                    name="seawater_cooling_systems"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.operator_awareness_dashboard,
                    }}
                    name="operator_awareness_dashboard"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.hpu_optimization,
                    }}
                    name="hpu_optimization"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.optimized_heat_tracing_system,
                    }}
                    name="optimized_heat_tracing_system"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.floodlighting_optimization,
                    }}
                    name="floodlighting_optimization"
                  />
                  <FormSwitch<FormValues>
                    formItemProps={{
                      label: labels.vfds_on_aux_machinery,
                    }}
                    name="vfds_on_aux_machinery"
                  />
                </Form>
              </Col>
              <Col span={12}>
                <Form layout="vertical">
                  <Box mb="20px">
                    <Title level={5} type="secondary">
                      Capacities
                    </Title>
                  </Box>
                  <FormInputNumber<FormValues>
                    name="quarters_capacity"
                    formItemProps={{ label: labels.quarters_capacity }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.quarters_capacity,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="rig_water_depth"
                    formItemProps={{ label: labels.rig_water_depth }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.rig_water_depth,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="variable_load"
                    formItemProps={{ label: labels.variable_load }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.variable_load,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="cantilever_reach"
                    formItemProps={{ label: labels.cantilever_reach }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.cantilever_reach,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="cantilever_lateral"
                    formItemProps={{ label: labels.cantilever_lateral }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.cantilever_lateral,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="cantilever_capacity"
                    formItemProps={{ label: labels.cantilever_capacity }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.cantilever_capacity,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="derrick_height"
                    formItemProps={{ label: labels.derrick_height }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.derrick_height,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="derrick_capacity"
                    formItemProps={{ label: labels.derrick_capacity }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.derrick_capacity,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="drawworks_power"
                    formItemProps={{ label: labels.drawworks_power }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.drawworks_power,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="total_cranes"
                    formItemProps={{ label: labels.total_cranes }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.total_cranes,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="crane_capacity"
                    formItemProps={{ label: labels.crane_capacity }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.crane_capacity,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="hull_breadth"
                    formItemProps={{ label: labels.hull_breadth }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.hull_breadth,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="hull_depth"
                    formItemProps={{ label: labels.hull_depth }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.hull_depth,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="hull_length"
                    formItemProps={{ label: labels.hull_length }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.hull_length,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="leg_length"
                    formItemProps={{ label: labels.leg_length }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.leg_length,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="leg_spacing"
                    formItemProps={{ label: labels.leg_spacing }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.leg_spacing,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="total_bop_rams"
                    formItemProps={{ label: labels.total_bop_rams }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.total_bop_rams,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="bop_diameter_wp_max"
                    formItemProps={{ label: labels.bop_diameter_wp_max }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.bop_diameter_wp_max,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="bop_wp_max"
                    formItemProps={{ label: labels.bop_wp_max }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.bop_wp_max,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="number_of_bop_stacks"
                    formItemProps={{ label: labels.number_of_bop_stacks }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.number_of_bop_stacks,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="mudpump_quantity"
                    formItemProps={{ label: labels.mudpump_quantity }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.mudpump_quantity,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="liquid_mud"
                    formItemProps={{ label: labels.liquid_mud }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.liquid_mud,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="mud_total_power"
                    formItemProps={{ label: labels.mud_total_power }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.mud_total_power,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="shaleshaker_total"
                    formItemProps={{ label: labels.shaleshaker_total }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.shaleshaker_total,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="engine_power"
                    formItemProps={{ label: labels.engine_power }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.engine_power,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="engine_quantity"
                    formItemProps={{ label: labels.engine_quantity }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.engine_quantity,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="engine_total"
                    formItemProps={{ label: labels.engine_total }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.engine_total,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="generator_power"
                    formItemProps={{ label: labels.generator_power }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.generator_power,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="generator_quantity"
                    formItemProps={{ label: labels.generator_quantity }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.generator_quantity,
                      )}`,
                    }}
                  />
                  <FormInputNumber<FormValues>
                    name="generator_total"
                    formItemProps={{ label: labels.generator_total }}
                    inputNumberProps={{
                      placeholder: `Enter ${toLowerCaseFirstLetter(
                        labels.generator_total,
                      )}`,
                    }}
                  />
                </Form>
              </Col>
            </Row>
          </Box>
          <SubmitRow>
            <>
              <Button onClick={handleBack}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                onClick={submitForm}
                disabled={isSubmitting || !isValid}
              >
                Save
              </Button>
            </>
          </SubmitRow>
        </>
      )}
    </Formik>
  );
};

export default UpdateJackupForm;
