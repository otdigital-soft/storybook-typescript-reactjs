import { ProjectDetails } from 'api/schema';
import { FormValues } from 'containers/ProjectForm/form';

export const getInitialValues = (
  projectData: ProjectDetails | undefined,
): FormValues => {
  return {
    name: projectData?.name ?? '',
    description: projectData?.description ?? '',
    ahv_avg_fuel_consumption: projectData?.ahv_avg_fuel_consumption ?? '',
    ahv_day_rate: projectData?.ahv_day_rate ?? '',
    ahv_no_days_per_location: projectData?.ahv_no_days_per_location ?? '',
    ahv_no_used: projectData?.ahv_no_used ?? '',
    co2_emission_per_m3_fuel: projectData?.co2_emission_per_m3_fuel ?? '',
    co2_emission_per_tonne_fuel: projectData?.co2_emission_per_tonne_fuel ?? '',
    co2_tax: projectData?.co2_tax ?? '',
    fuel_density: projectData?.fuel_density ?? '',
    fuel_total_price: projectData?.fuel_total_price ?? '',
    helicopter_avg_fuel_consumption:
      projectData?.helicopter_avg_fuel_consumption ?? '',
    helicopter_fuel_price: projectData?.helicopter_fuel_price ?? '',
    helicopter_no_flights_per_week:
      projectData?.helicopter_no_flights_per_week ?? '',
    helicopter_rate_per_trip: projectData?.helicopter_rate_per_trip ?? '',
    helicopter_types: projectData?.helicopter_types ?? '',
    helicopter_cruise_speed: projectData?.helicopter_cruise_speed ?? '',
    marine_diesel_oil_price: projectData?.marine_diesel_oil_price ?? '',
    nox_tax: projectData?.nox_tax ?? '',
    psv_fuel_price: projectData?.psv_fuel_price ?? '',
    psv_avg_fuel_transit_consumption:
      projectData?.psv_avg_fuel_transit_consumption ?? '',
    psv_avg_fuel_dp_consumption: projectData?.psv_avg_fuel_dp_consumption ?? '',
    psv_speed: projectData?.psv_speed ?? '',
    psv_loading_time: projectData?.psv_loading_time ?? '',
    psv_calls_per_week: projectData?.psv_calls_per_week ?? '',
    psv_day_rate: projectData?.psv_day_rate ?? '',
    psv_types: projectData?.psv_types ?? '',
    tugs_day_rate: projectData?.tugs_day_rate ?? '',
    tugs_avg_move_fuel_consumption:
      projectData?.tugs_avg_move_fuel_consumption ?? '',
    tugs_avg_transit_fuel_consumption:
      projectData?.tugs_avg_transit_fuel_consumption ?? '',
    tugs_move_speed: projectData?.tugs_move_speed ?? '',
    tugs_transit_speed: projectData?.tugs_transit_speed ?? '',
  };
};
