import { SEMI_LABELS as labels } from 'consts/rigs';

import { Col } from 'antd';
import { ConceptSemiRigDetails, CustomSemiRigDetails } from 'api/schema';
import { DetailBooleanItem } from 'components/DetailItem';

interface OperationEmissionProps {
  rig?: CustomSemiRigDetails | ConceptSemiRigDetails;
}

const OperationEmission = ({ rig }: OperationEmissionProps) => {
  return (
    <>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.offline_stand_building}
          value={rig?.offline_stand_building}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.drilltronic}
          value={rig?.drilltronic}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem label={labels.scr} value={rig?.scr} />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.operator_awareness_dashboard}
          value={rig?.operator_awareness_dashboard}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.auto_pipe_handling}
          value={rig?.auto_pipe_handling}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.dynamic_drilling_guide}
          value={rig?.dynamic_drilling_guide}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem label={labels.hybrid} value={rig?.hybrid} />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.hpu_optimization}
          value={rig?.hpu_optimization}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.dual_activity}
          value={rig?.dual_activity}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.process_automation_platform}
          value={rig?.process_automation_platform}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.hvac_heat_recovery}
          value={rig?.hvac_heat_recovery}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.optimized_heat_tracing_system}
          value={rig?.optimized_heat_tracing_system}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.automatic_tripping}
          value={rig?.automatic_tripping}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.freshwater_cooling_systems}
          value={rig?.freshwater_cooling_systems}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.floodlighting_optimization}
          value={rig?.floodlighting_optimization}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.seawater_cooling_systems}
          value={rig?.seawater_cooling_systems}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem label={labels.closed_bus} value={rig?.closed_bus} />
      </Col>
      <Col span={6}>
        <DetailBooleanItem
          label={labels.vfds_on_aux_machinery}
          value={rig?.vfds_on_aux_machinery}
        />
      </Col>
      <Col span={6}>
        <DetailBooleanItem label={labels.tripsaver} value={rig?.tripsaver} />
      </Col>
    </>
  );
};

export default OperationEmission;
