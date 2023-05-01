import { Col, Row } from 'antd';
import { ProjectDetails as ProjectDetailsData } from 'api/schema';
import Box from 'components/Box';
import { PROJECT_LABELS as labels } from 'consts/projects';
import DetailsCol from 'pages/Project/DetailsCol';
import { dollarFormatter } from 'utils/currency';
interface ProjectDetailsProps {
  project: ProjectDetailsData;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <Box>
      <Row gutter={[24, 30]}>
        <DetailsCol span={6} title="Project name">
          {project.name}
        </DetailsCol>
        <DetailsCol span={18} title={labels.description}>
          {project.description}
        </DetailsCol>
        {/* Tugs */}
        <DetailsCol span={6} title={labels.tugs_day_rate}>
          {dollarFormatter.format(project.tugs_day_rate)}
        </DetailsCol>
        <DetailsCol span={6} title={labels.tugs_avg_move_fuel_consumption}>
          {project.tugs_avg_move_fuel_consumption}
        </DetailsCol>
        <DetailsCol span={6} title={labels.tugs_avg_transit_fuel_consumption}>
          {project.tugs_avg_transit_fuel_consumption}
        </DetailsCol>
        <DetailsCol span={6} title={labels.tugs_move_speed}>
          {project.tugs_move_speed}
        </DetailsCol>
        <DetailsCol span={6} title={labels.tugs_transit_speed}>
          {project.tugs_transit_speed}
        </DetailsCol>
        <Col span={18} />
        {/* AHV */}
        <DetailsCol span={6} title={labels.ahv_no_used}>
          {project.ahv_no_used}
        </DetailsCol>
        <DetailsCol span={6} title={labels.ahv_no_days_per_location}>
          {project.ahv_no_days_per_location}
        </DetailsCol>
        <DetailsCol span={6} title={labels.ahv_avg_fuel_consumption}>
          {project.ahv_avg_fuel_consumption}
        </DetailsCol>
        <DetailsCol span={6} title={labels.ahv_day_rate}>
          {dollarFormatter.format(project.ahv_day_rate)}
        </DetailsCol>
        {/* PSV */}
        <DetailsCol span={6} title={labels.psv_calls_per_week}>
          {project.psv_calls_per_week}
        </DetailsCol>
        <DetailsCol span={6} title={labels.psv_types}>
          {project.psv_types}
        </DetailsCol>
        <DetailsCol span={6} title={labels.psv_avg_fuel_transit_consumption}>
          {project.psv_avg_fuel_transit_consumption}
        </DetailsCol>
        <DetailsCol span={6} title={labels.psv_avg_fuel_dp_consumption}>
          {project.psv_avg_fuel_dp_consumption}
        </DetailsCol>
        <DetailsCol span={6} title={labels.psv_day_rate}>
          {dollarFormatter.format(project.psv_day_rate)}
        </DetailsCol>
        <DetailsCol span={6} title={labels.psv_speed}>
          {project.psv_speed}
        </DetailsCol>
        <DetailsCol span={6} title={labels.psv_loading_time}>
          {project.psv_loading_time}
        </DetailsCol>
        <Col span={6} />
        {/* Helicopter */}
        <DetailsCol span={6} title={labels.helicopter_no_flights_per_week}>
          {project.helicopter_no_flights_per_week}
        </DetailsCol>
        <DetailsCol span={6} title={labels.helicopter_types}>
          {project.helicopter_types}
        </DetailsCol>
        <DetailsCol span={6} title={labels.helicopter_avg_fuel_consumption}>
          {project.helicopter_avg_fuel_consumption}
        </DetailsCol>
        <DetailsCol span={6} title={labels.helicopter_rate_per_trip}>
          {dollarFormatter.format(project.helicopter_rate_per_trip)}
        </DetailsCol>
        <DetailsCol span={6} title={labels.helicopter_cruise_speed}>
          {project.helicopter_cruise_speed}
        </DetailsCol>
        <Col span={18} />
        {/* Fuel and emission */}
        <DetailsCol span={6} title={labels.helicopter_fuel_price}>
          {dollarFormatter.format(project.helicopter_fuel_price)}
        </DetailsCol>
        <DetailsCol span={6} title={labels.psv_fuel_price}>
          {dollarFormatter.format(project.psv_fuel_price)}
        </DetailsCol>
        <DetailsCol span={6} title={labels.marine_diesel_oil_price}>
          {dollarFormatter.format(project.marine_diesel_oil_price)}
        </DetailsCol>
        <DetailsCol span={6} title={labels.co2_tax}>
          {dollarFormatter.format(project.co2_tax)}
        </DetailsCol>
        <DetailsCol span={6} title={labels.nox_tax}>
          {dollarFormatter.format(project.nox_tax)}
        </DetailsCol>
        <DetailsCol span={6} title={labels.fuel_total_price}>
          {dollarFormatter.format(project.fuel_total_price)}
        </DetailsCol>
        <DetailsCol span={6} title={labels.fuel_density}>
          {project.fuel_density}
        </DetailsCol>
        <DetailsCol span={6} title={labels.co2_emission_per_tonne_fuel}>
          {project.co2_emission_per_tonne_fuel}
        </DetailsCol>
        <DetailsCol span={6} title={labels.co2_emission_per_m3_fuel}>
          {project.co2_emission_per_m3_fuel}
        </DetailsCol>
      </Row>
    </Box>
  );
};

export default ProjectDetails;
