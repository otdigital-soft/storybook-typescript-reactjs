import {
  DetailItem,
  DetailNumberItem,
  DetailOptionItem,
} from 'components/DetailItem';
import {
  DESIGN_SCORE_DISPLAY,
  DRILLFLOOR_EFFICIENCY_DISPLAY,
  EQUIPMENT_LOAD_DISPLAY,
  RIG_STATUS_DISPLAY,
  SEMI_LABELS as labels,
  TOPSIDE_DESIGN_DISPLAY,
} from 'consts/rigs';

import { Col } from 'antd';
import { ConceptSemiRigDetails, CustomSemiRigDetails } from 'api/schema';
import { DetailDateItem } from 'components/DetailItem';
import { dollarFormatter } from 'utils/currency';

interface GeneralInformationProps {
  rig?: CustomSemiRigDetails | ConceptSemiRigDetails;
}

const GeneralInformation = ({ rig }: GeneralInformationProps) => {
  return (
    <>
      <Col span={6}>
        <DetailOptionItem
          label={labels.rig_status}
          value={rig?.rig_status}
          display={RIG_STATUS_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.months_in_operation_last_year}
          value={rig?.months_in_operation_last_year}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.topside_design}
          value={rig?.topside_design}
          display={TOPSIDE_DESIGN_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailItem label={labels.manager} value={rig?.manager} />
      </Col>
      <Col span={6}>
        <DetailDateItem
          label={labels.delivery_date}
          value={rig?.delivery_date}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.months_in_operation_last_3_years}
          value={rig?.months_in_operation_last_3_years}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.drillfloor_efficiency}
          value={rig?.drillfloor_efficiency}
          display={DRILLFLOOR_EFFICIENCY_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailItem label={labels.design} value={rig?.design} />
      </Col>
      <Col span={6}>
        <DetailDateItem
          label={labels.special_survey_due}
          value={rig?.special_survey_due}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.design_score}
          value={rig?.design_score}
          display={DESIGN_SCORE_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailItem label={labels.build_yard} value={rig?.build_yard} />
      </Col>
      <Col span={6}>
        <DetailDateItem
          label={labels.end_of_last_contract}
          value={rig?.end_of_last_contract}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.equipment_load}
          value={rig?.equipment_load}
          display={EQUIPMENT_LOAD_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailItem
          label={labels.day_rate}
          value={rig?.day_rate}
          formatter={(value) =>
            value !== null ? dollarFormatter.format(value) : ''
          }
        />
      </Col>
      <Col span={6}>
        <DetailItem
          label={labels.spread_cost}
          value={rig?.spread_cost}
          formatter={(value) =>
            value !== null ? dollarFormatter.format(value) : ''
          }
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.tugs_no_used}
          value={rig?.tugs_no_used}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.move_speed} value={rig?.move_speed} />
      </Col>
    </>
  );
};

export default GeneralInformation;
