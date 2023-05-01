import { Col } from 'antd';

import { ConceptJackupRigDetails, CustomJackupRigDetails } from 'api/schema';
import { DetailItem } from 'components/DetailItem';
import DetailNumberItem from 'components/DetailItem/DetailNumberItem';
import { JACKUP_LABELS as labels } from 'consts/rigs';

interface CapacitiesProps {
  rig?: CustomJackupRigDetails | ConceptJackupRigDetails;
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
          label={labels.drawworks_power}
          value={rig?.drawworks_power}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.leg_length} value={rig?.leg_length} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.mud_total_power}
          value={rig?.mud_total_power}
        />
      </Col>
      <Col span={6}>
        <DetailItem
          label={labels.rig_water_depth}
          value={rig?.rig_water_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.total_cranes}
          value={rig?.total_cranes}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.leg_spacing} value={rig?.leg_spacing} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.shaleshaker_total}
          value={rig?.shaleshaker_total}
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
          label={labels.crane_capacity}
          value={rig?.crane_capacity}
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
          label={labels.engine_power}
          value={rig?.engine_power}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.cantilever_reach}
          value={rig?.cantilever_reach}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.hull_breadth}
          value={rig?.hull_breadth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.bop_diameter_wp_max}
          value={rig?.bop_diameter_wp_max}
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
          label={labels.cantilever_capacity}
          value={rig?.cantilever_capacity}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.cantilever_lateral}
          value={rig?.cantilever_lateral}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.hull_length} value={rig?.hull_length} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.number_of_bop_stacks}
          value={rig?.number_of_bop_stacks}
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
          label={labels.derrick_height}
          value={rig?.derrick_height}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.hull_depth} value={rig?.hull_depth} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.mudpump_quantity}
          value={rig?.mudpump_quantity}
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
          label={labels.derrick_capacity}
          value={rig?.derrick_capacity}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.liquid_mud} value={rig?.liquid_mud} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.generator_total}
          value={rig?.generator_total}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.bop_wp_max} value={rig?.bop_wp_max} />
      </Col>
    </>
  );
};

export default Capacities;
