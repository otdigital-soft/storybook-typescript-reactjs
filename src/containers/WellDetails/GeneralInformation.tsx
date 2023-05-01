import { Col, Row } from 'antd';
import { RowProps } from 'antd/lib/grid/row';
import { ConceptWellDetails, CustomWellDetails } from 'api/schema';
import { DetailNumberItem, DetailOptionItem } from 'components/DetailItem';
import {
  COMPLETION_DISPLAY,
  METOCEAN_DATA_DISPLAY,
  PNA_DISPLAY,
  RESERVOIR_SECTION_DISPLAY,
  SEASON_DISPLAY,
  TOP_HOLE_DISPLAY,
  TRANSPORT_SECTION_DISPLAY,
  WELL_LABELS as labels,
  WELL_TYPE_DISPLAY,
} from 'consts/wells';

interface GeneralInformationProps {
  data?: CustomWellDetails | ConceptWellDetails;
  gutter: RowProps['gutter'];
  children?: JSX.Element;
}

const GeneralInformation = ({
  data,
  gutter,
  children,
}: GeneralInformationProps) => {
  return (
    <Row gutter={gutter}>
      {children}
      <Col span={6}>
        <DetailNumberItem
          label={labels.water_depth}
          value={data?.water_depth}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.transport_section}
          value={data?.transport_section}
          display={TRANSPORT_SECTION_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.pna}
          value={data?.pna}
          display={PNA_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.type}
          value={data?.type}
          display={WELL_TYPE_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.reservoir_section}
          value={data?.reservoir_section}
          display={RESERVOIR_SECTION_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.season}
          value={data?.season}
          display={SEASON_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.top_hole}
          value={data?.top_hole}
          display={TOP_HOLE_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.completion}
          value={data?.completion}
          display={COMPLETION_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.metocean_data}
          value={data?.metocean_data}
          display={METOCEAN_DATA_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.metocean_days_above_hs_5}
          value={data?.metocean_days_above_hs_5}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.tvd_from_msl}
          value={data?.tvd_from_msl}
        />
      </Col>
    </Row>
  );
};

export default GeneralInformation;
