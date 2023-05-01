import { Col, Row } from 'antd';
import Form from 'antd/lib/form/Form';
import FormInputNumber from 'components/FormInputNumber';
import FormSelect from 'components/FormSelect';
import FormSwitch from 'components/FormSwitch';
import { DP_CLASS_OPTIONS, DRILLSHIP_LABELS as labels } from 'consts/rigs';
import { FormValues } from 'containers/UpdateDrillshipForm/form';
import { toLowerCaseFirstLetter } from 'utils/format';
const DrillshipCapacitiesStep = () => {
  return (
    <Form layout="vertical">
      <Row gutter={35}>
        <Col span={12}>
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
            name="hull_concept_score"
            formItemProps={{ label: labels.hull_concept_score }}
            inputNumberProps={{
              placeholder: `Enter ${toLowerCaseFirstLetter(
                labels.hull_concept_score,
              )}`,
            }}
          />
          <FormInputNumber<FormValues>
            name="hull_design_eco_score"
            formItemProps={{ label: labels.hull_design_eco_score }}
            inputNumberProps={{
              placeholder: `Enter ${toLowerCaseFirstLetter(
                labels.hull_design_eco_score,
              )}`,
            }}
          />
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.dp,
            }}
            name="dp"
          />
          <FormSelect<FormValues>
            name="dp_class"
            formItemProps={{ label: labels.dp_class }}
            options={DP_CLASS_OPTIONS}
            selectInputProps={{
              placeholder: `Enter ${toLowerCaseFirstLetter(labels.dp_class)}`,
            }}
          />
          <FormInputNumber<FormValues>
            name="draft_depth"
            formItemProps={{ label: labels.draft_depth }}
            inputNumberProps={{
              placeholder: `Enter ${toLowerCaseFirstLetter(
                labels.draft_depth,
              )}`,
            }}
          />
          <FormInputNumber<FormValues>
            name="displacement"
            formItemProps={{ label: labels.displacement }}
            inputNumberProps={{
              placeholder: `Enter ${toLowerCaseFirstLetter(
                labels.displacement,
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
              placeholder: `Enter ${toLowerCaseFirstLetter(labels.hull_depth)}`,
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
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.dual_derrick,
            }}
            name="dual_derrick"
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
          <FormSwitch<FormValues>
            formItemProps={{
              label: labels.active_heave_drawwork,
            }}
            name="active_heave_drawwork"
          />
          <FormSwitch<FormValues>
            name="cmc_with_active_heave"
            formItemProps={{ label: labels.cmc_with_active_heave }}
          />
          <FormSwitch<FormValues>
            name="ram_system"
            formItemProps={{ label: labels.ram_system }}
          />
        </Col>
        <Col span={12}>
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
            name="riser_on_board_outfitted"
            formItemProps={{ label: labels.riser_on_board_outfitted }}
            inputNumberProps={{
              placeholder: `Enter ${toLowerCaseFirstLetter(
                labels.riser_on_board_outfitted,
              )}`,
            }}
          />
          <FormSwitch<FormValues>
            name="riser_storage_inside_hull"
            formItemProps={{ label: labels.riser_storage_inside_hull }}
          />
          <FormSwitch<FormValues>
            name="split_funnels_free_stern_deck"
            formItemProps={{ label: labels.riser_storage_inside_hull }}
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
              placeholder: `Enter ${labels.bop_diameter_wp_max}`,
            }}
          />
          <FormInputNumber<FormValues>
            name="bop_wp_max"
            formItemProps={{ label: labels.bop_wp_max }}
            inputNumberProps={{
              placeholder: `Enter ${labels.bop_wp_max}`,
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
              placeholder: `Enter ${toLowerCaseFirstLetter(labels.liquid_mud)}`,
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
        </Col>
      </Row>
    </Form>
  );
};

export default DrillshipCapacitiesStep;
