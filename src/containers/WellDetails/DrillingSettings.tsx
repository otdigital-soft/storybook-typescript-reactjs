import { Col, Row } from 'antd';
import { RowProps } from 'antd/lib/grid/row';
import { ConceptWellDetails, CustomWellDetails } from 'api/schema';
import { DetailNumberItem, DetailOptionItem } from 'components/DetailItem';
import { MUD_TYPE_DISPLAY, WELL_LABELS as labels } from 'consts/wells';

interface DrillingSettingsProps {
  data?: CustomWellDetails | ConceptWellDetails;
  gutter: RowProps['gutter'];
}

const DrillingSettings = ({ gutter, data }: DrillingSettingsProps) => {
  return (
    <Row gutter={gutter}>
      <Col span={6}>
        <DetailNumberItem
          label={labels.planned_time_per_well}
          value={data?.planned_time_per_well}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.md_from_msl}
          value={data?.md_from_msl}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.expected_reservoir_pressure}
          value={data?.expected_reservoir_pressure}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.expected_reservoir_temperature}
          value={data?.expected_reservoir_temperature}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.top_hole_section_hole_size}
          value={data?.top_hole_section_hole_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.surface_casing_section_hole_size}
          value={data?.surface_casing_section_hole_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.intermediate_casing_section_hole_size}
          value={data?.intermediate_casing_section_hole_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.production_casing_section_hole_size}
          value={data?.production_casing_section_hole_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.extension_section_hole_size}
          value={data?.extension_section_hole_size}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.intermediate_casing_section_mud_type}
          value={data?.intermediate_casing_section_mud_type}
          display={MUD_TYPE_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.production_casing_section_mud_type}
          value={data?.production_casing_section_mud_type}
          display={MUD_TYPE_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailOptionItem
          label={labels.extension_section_mud_type}
          value={data?.extension_section_mud_type}
          display={MUD_TYPE_DISPLAY}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.intermediate_casing_section_mud_density}
          value={data?.intermediate_casing_section_mud_density}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.production_casing_section_mud_density}
          value={data?.production_casing_section_mud_density}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.extension_section_mud_density}
          value={data?.extension_section_mud_density}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.conductor_size}
          value={data?.conductor_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.conductor_weight}
          value={data?.conductor_weight}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.conductor_tvd_shoe_depth}
          value={data?.conductor_tvd_shoe_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.conductor_md_shoe_depth}
          value={data?.conductor_md_shoe_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.surface_casing_size}
          value={data?.surface_casing_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.surface_casing_weight}
          value={data?.surface_casing_weight}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.surface_casing_tvd_shoe_depth}
          value={data?.surface_casing_tvd_shoe_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.surface_casing_md_shoe_depth}
          value={data?.surface_casing_md_shoe_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.intermediate_casing_size}
          value={data?.intermediate_casing_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.intermediate_casing_weight}
          value={data?.intermediate_casing_weight}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.intermediate_casing_tvd_shoe_depth}
          value={data?.intermediate_casing_tvd_shoe_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.intermediate_casing_md_shoe_depth}
          value={data?.intermediate_casing_md_shoe_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.production_casing_size}
          value={data?.production_casing_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.production_casing_weight}
          value={data?.production_casing_weight}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.production_casing_tvd_shoe_depth}
          value={data?.production_casing_tvd_shoe_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.production_casing_md_shoe_depth}
          value={data?.production_casing_md_shoe_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.liner_other_size}
          value={data?.liner_other_size}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.liner_other_weight}
          value={data?.liner_other_weight}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.liner_other_tvd_shoe_depth}
          value={data?.liner_other_tvd_shoe_depth}
        />
      </Col>
      <Col span={6}>
        <DetailNumberItem
          label={labels.liner_other_md_shoe_depth}
          value={data?.liner_other_md_shoe_depth}
        />
      </Col>
    </Row>
  );
};

export default DrillingSettings;
