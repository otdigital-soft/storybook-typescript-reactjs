import { PROJECT_LABELS as labels } from 'consts/projects';
import { numberSchema, stringSchema } from 'utils/yup';
import * as yup from 'yup';

export const schema = yup.object().shape({
  name: stringSchema(labels.name, {
    required: true,
    max: 255,
  }),
  description: stringSchema(labels.description, {
    required: true,
  }),
  ahv_avg_fuel_consumption: numberSchema(labels.ahv_avg_fuel_consumption, {
    required: true,
    min: 0,
    max: 50,
  }),
  ahv_day_rate: numberSchema(labels.ahv_day_rate, {
    required: true,
    min: 0,
    max: 1000000,
  }),
  ahv_no_days_per_location: numberSchema(labels.ahv_no_days_per_location, {
    required: true,
    min: 0,
  }),
  ahv_no_used: numberSchema(labels.ahv_no_used, {
    required: true,
    integer: true,
    min: 0,
    max: 10,
  }),
  co2_emission_per_m3_fuel: numberSchema(labels.co2_emission_per_m3_fuel, {
    required: true,
    min: 0,
    max: 10,
  }),
  co2_emission_per_tonne_fuel: numberSchema(
    labels.co2_emission_per_tonne_fuel,
    {
      required: true,
      min: 0,
      max: 10,
    },
  ),
  co2_tax: numberSchema(labels.co2_tax, {
    required: true,
    min: 0,
    max: 10000,
    integer: true,
  }),
  fuel_density: numberSchema(labels.fuel_density, {
    required: true,
    min: 0,
    max: 5,
  }),
  fuel_total_price: numberSchema(labels.fuel_total_price, {
    required: true,
    min: 0,
    max: 10000,
    integer: true,
  }),
  helicopter_avg_fuel_consumption: numberSchema(
    labels.helicopter_avg_fuel_consumption,
    {
      required: true,
      min: 0,
      max: 120,
    },
  ),
  helicopter_fuel_price: numberSchema(labels.helicopter_fuel_price, {
    required: true,
    min: 0,
    max: 10000,
    integer: true,
  }),
  helicopter_no_flights_per_week: numberSchema(
    labels.helicopter_no_flights_per_week,
    {
      required: true,
      min: 0,
      max: 100,
    },
  ),
  helicopter_rate_per_trip: numberSchema(labels.helicopter_rate_per_trip, {
    required: true,
    min: 0,
    max: 100000,
  }),
  helicopter_cruise_speed: numberSchema(labels.helicopter_cruise_speed, {
    required: true,
    min: 100,
    max: 300,
  }),
  helicopter_types: stringSchema(labels.helicopter_types, {
    required: true,
  }),

  marine_diesel_oil_price: numberSchema(labels.marine_diesel_oil_price, {
    required: true,
    min: 0,
    max: 10000,
    integer: true,
  }),
  nox_tax: numberSchema(labels.nox_tax, {
    required: true,
    min: 0,
    max: 10000,
    integer: true,
  }),
  psv_fuel_price: numberSchema(labels.psv_fuel_price, {
    required: true,
    min: 0,
    max: 10000,
    integer: true,
  }),
  psv_avg_fuel_transit_consumption: numberSchema(
    labels.psv_avg_fuel_transit_consumption,
    {
      required: true,
      min: 0.1,
      max: 50,
    },
  ),
  psv_avg_fuel_dp_consumption: numberSchema(
    labels.psv_avg_fuel_dp_consumption,
    {
      required: true,
      min: 0.1,
      max: 30,
    },
  ),
  psv_speed: numberSchema(labels.psv_speed, {
    required: true,
    min: 1,
    max: 40,
  }),
  psv_loading_time: numberSchema(labels.psv_loading_time, {
    required: true,
    min: 0,
    max: 10,
  }),
  psv_calls_per_week: numberSchema(labels.psv_calls_per_week, {
    required: true,
    min: 0,
    max: 100,
  }),
  psv_day_rate: numberSchema(labels.psv_day_rate, {
    required: true,
    min: 0,
    max: 1000000,
  }),
  psv_types: stringSchema(labels.psv_types, {
    required: true,
  }),
  tugs_day_rate: numberSchema(labels.tugs_day_rate, {
    min: 0,
    required: true,
  }),
  tugs_avg_move_fuel_consumption: numberSchema(
    labels.tugs_avg_move_fuel_consumption,
    {
      min: 0.1,
      max: 30,
      required: true,
    },
  ),
  tugs_avg_transit_fuel_consumption: numberSchema(
    labels.tugs_avg_transit_fuel_consumption,
    {
      min: 0.1,
      max: 30,
      required: true,
    },
  ),
  tugs_move_speed: numberSchema(labels.tugs_move_speed, {
    min: 1,
    max: 10,
    required: true,
  }),
  tugs_transit_speed: numberSchema(labels.tugs_transit_speed, {
    min: 1,
    max: 40,
    required: true,
  }),
});
