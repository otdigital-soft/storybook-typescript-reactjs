import { Col, Row } from 'antd';
import { RowProps } from 'antd/lib/grid/row';
import { ConceptWellDetails, CustomWellDetails } from 'api/schema';
import { DetailNumberItem } from 'components/DetailItem';
import { WELL_LABELS as labels } from 'consts/wells';

interface CompletionDataProps {
  data?: CustomWellDetails | ConceptWellDetails;
  gutter: RowProps['gutter'];
}

const CompletionData = ({ data, gutter }: CompletionDataProps) => {
  return (
    <Row gutter={gutter}>
      <Col span={6}>
        <DetailNumberItem
          label={labels.no_well_to_be_completed}
          value={data?.no_well_to_be_completed}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.planned_time_per_completion_operation}
          value={data?.planned_time_per_completion_operation}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.subsea_xmas_tree_size}
          value={data?.subsea_xmas_tree_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.xt_weight} value={data?.xt_weight} />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.lrp_size} value={data?.lrp_size} />
      </Col>
      <Col span={6}>
        <DetailNumberItem label={labels.lrp_weight} value={data?.lrp_weight} />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.xt_running_tool_size}
          value={data?.xt_running_tool_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.xt_running_tool_weight}
          value={data?.xt_running_tool_weight}
        />
      </Col>
    </Row>
  );
};

export default CompletionData;
