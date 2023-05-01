import { Col } from 'antd';
import { ConceptDrillshipDetails, CustomDrillshipDetails } from 'api/schema';
import { DetailBooleanItem, DetailOptionItem } from 'components/DetailItem';
import DetailNumberItem from 'components/DetailItem/DetailNumberItem';
import { DP_CLASS_DISPLAY, DRILLSHIP_LABELS as labels } from 'consts/rigs';

interface CapacitiesProps {
  rig?: CustomDrillshipDetails | ConceptDrillshipDetails;
}

const Capacities = ({ rig }: CapacitiesProps) => {
  return (
    <>
      <Col span={6}>
        <DetailNumberItem
          label={labels.quarters_capacity}
          value={rig?.quarters_capacity}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.rig_water_depth}
          value={rig?.rig_water_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.variable_load}
          value={rig?.variable_load}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.hull_concept_score}
          value={rig?.hull_concept_score}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.hull_design_eco_score}
          value={rig?.hull_design_eco_score}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem label={labels.dp} value={rig?.dp} />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.dp_class}
          value={rig?.dp_class}
          display={DP_CLASS_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.draft_depth} value={rig?.draft_depth} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.displacement}
          value={rig?.displacement}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.hull_breadth}
          value={rig?.hull_breadth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.hull_depth} value={rig?.hull_depth} />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.hull_length} value={rig?.hull_length} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.derrick_height}
          value={rig?.derrick_height}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.derrick_capacity}
          value={rig?.derrick_capacity}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.dual_derrick}
          value={rig?.dual_derrick}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.drawworks_power}
          value={rig?.drawworks_power}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.active_heave_drawwork}
          value={rig?.active_heave_drawwork}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.cmc_with_active_heave}
          value={rig?.cmc_with_active_heave}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem label={labels.ram_system} value={rig?.ram_system} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.total_cranes}
          value={rig?.total_cranes}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.crane_capacity}
          value={rig?.crane_capacity}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.riser_on_board_outfitted}
          value={rig?.riser_on_board_outfitted}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.riser_storage_inside_hull}
          value={rig?.riser_storage_inside_hull}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.split_funnels_free_stern_deck}
          value={rig?.split_funnels_free_stern_deck}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.total_bop_rams}
          value={rig?.total_bop_rams}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.bop_diameter_wp_max}
          value={rig?.bop_diameter_wp_max}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.bop_wp_max} value={rig?.bop_wp_max} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.number_of_bop_stacks}
          value={rig?.number_of_bop_stacks}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.mudpump_quantity}
          value={rig?.mudpump_quantity}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.liquid_mud} value={rig?.liquid_mud} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.mud_total_power}
          value={rig?.mud_total_power}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.shaleshaker_total}
          value={rig?.shaleshaker_total}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.engine_power}
          value={rig?.engine_power}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.engine_quantity}
          value={rig?.engine_quantity}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.engine_total}
          value={rig?.engine_total}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.generator_power}
          value={rig?.generator_power}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.generator_quantity}
          value={rig?.generator_quantity}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.generator_total}
          value={rig?.generator_total}
        />
      </Col>
    </>
  );
};

export default Capacities;
