import { JACKUP_LABELS as labels } from 'consts/rigs';
import { endOfDay } from 'date-fns';
import {
  booleanSchema,
  dateSchema,
  mergeSchema,
  numberSchema,
  stringSchema,
} from 'utils/yup';
import * as yup from 'yup';
import { FormValues } from './useUpdateJackupForm';

export const getGeneralValidationSchema = (required: boolean) =>
  yup.object().shape({
    name: stringSchema(labels.name, { required: true }),
    manager: stringSchema(labels.manager, { required }),
    design: stringSchema(labels.design, { required }),
    build_yard: stringSchema(labels.build_yard, { required }),
    rig_status: stringSchema(labels.rig_status, { nullable: true, required }),
    delivery_date: dateSchema(labels.delivery_date, {
      nullable: true,
      min: new Date(1970, 0, 1),
      max: endOfDay(new Date(2025, 11, 31)),
      required,
    }),
    end_of_last_contract: dateSchema(labels.end_of_last_contract, {
      nullable: true,
      min: new Date(1970, 0, 1),
      max: endOfDay(new Date(2035, 11, 31)),
      required,
    }),
    special_survey_due: dateSchema(labels.special_survey_due, {
      nullable: true,
      min: new Date(2022, 0, 1),
      max: endOfDay(new Date(2027, 11, 31)),
      required,
    }),
    months_in_operation_last_year: numberSchema(
      labels.months_in_operation_last_year,
      {
        min: 0,
        max: 12,
        integer: true,
        required,
      },
    ),
    months_in_operation_last_3_years: numberSchema(
      labels.months_in_operation_last_3_years,
      {
        min: 0,
        max: 36,
        integer: true,
        required,
      },
    ),
    topside_design: stringSchema(labels.topside_design, {
      nullable: true,
      required,
    }),
    design_score: stringSchema(labels.design_score, {
      nullable: true,
      required,
    }),
    day_rate: numberSchema(labels.day_rate, {
      min: 0,
      max: 1000000,
    }),
    spread_cost: numberSchema(labels.spread_cost, {
      min: 0,
      max: 1000000,
    }),
    tugs_no_used: numberSchema(labels.tugs_no_used, {
      min: 0,
      max: 10,
      integer: true,
      required,
    }),
    jack_up_time: numberSchema(labels.jack_up_time, {
      min: 0,
      max: 10,
      required,
    }),
    jack_down_time: numberSchema(labels.jack_down_time, {
      min: 0,
      max: 10,
      required,
    }),
  });

export const getCapacitiesValidationSchema = (required: boolean) =>
  yup.object().shape({
    quarters_capacity: numberSchema(labels.quarters_capacity, {
      min: 10,
      max: 400,
      required,
    }),
    rig_water_depth: numberSchema(labels.rig_water_depth, {
      min: 0,
      max: 500,
      required,
    }),
    variable_load: numberSchema(labels.variable_load, {
      min: 0,
      max: 20000,
      required,
    }),
    cantilever_lateral: numberSchema(labels.cantilever_lateral, {
      min: 0,
      max: 50,
      required,
    }),
    cantilever_reach: numberSchema(labels.cantilever_reach, {
      min: 0,
      max: 150,
      required,
    }),
    cantilever_capacity: numberSchema(labels.cantilever_capacity, {
      min: 1000000,
      max: 5000000,
      required,
    }),
    derrick_height: numberSchema(labels.derrick_height, {
      min: 50,
      max: 300,
      required,
    }),
    derrick_capacity: numberSchema(labels.derrick_capacity, {
      min: 500000,
      max: 3000000,
      required,
    }),
    drawworks_power: numberSchema(labels.drawworks_power, {
      min: 1000,
      max: 10000,
      required,
    }),
    total_cranes: numberSchema(labels.total_cranes, {
      min: 1,
      max: 10,
      required,
    }),
    crane_capacity: numberSchema(labels.crane_capacity, {
      min: 10,
      max: 500,
      required,
    }),
    hull_breadth: numberSchema(labels.hull_breadth, {
      min: 100,
      max: 500,
      required,
    }),
    hull_depth: numberSchema(labels.hull_depth, {
      min: 10,
      max: 200,
      required,
    }),
    hull_length: numberSchema(labels.hull_length, {
      min: 100,
      max: 500,
      required,
    }),
    leg_length: numberSchema(labels.leg_length, {
      min: 100,
      max: 1000,
      required,
    }),
    leg_spacing: numberSchema(labels.leg_spacing, {
      min: 100,
      max: 300,
      required,
    }),
    total_bop_rams: numberSchema(labels.total_bop_rams, {
      min: 1,
      max: 10,
      required,
    }),
    bop_diameter_wp_max: numberSchema(labels.bop_diameter_wp_max, {
      min: 10,
      max: 30,
      required,
    }),
    bop_wp_max: numberSchema(labels.bop_wp_max, {
      min: 5000,
      max: 25000,
      required,
    }),
    number_of_bop_stacks: numberSchema(labels.number_of_bop_stacks, {
      min: 1,
      max: 3,
      required,
    }),
    mudpump_quantity: numberSchema(labels.mudpump_quantity, {
      min: 1,
      max: 10,
      integer: true,
      required,
    }),
    liquid_mud: numberSchema(labels.liquid_mud, {
      min: 1000,
      max: 30000,
      required,
    }),
    mud_total_power: numberSchema(labels.mud_total_power, {
      min: 1000,
      max: 20000,
      required,
    }),
    shaleshaker_total: numberSchema(labels.shaleshaker_total, {
      min: 0,
      max: 10,
      required,
    }),
    engine_power: numberSchema(labels.engine_power, {
      min: 0,
      max: 20000,
      required,
    }),
    engine_quantity: numberSchema(labels.engine_quantity, {
      min: 0,
      max: 10,
      integer: true,
      required,
    }),
    engine_total: numberSchema(labels.engine_total, {
      min: 0,
      max: 100000,
      required,
    }),
    generator_power: numberSchema(labels.generator_power, {
      min: 0,
      max: 20000,
      required,
    }),
    generator_quantity: numberSchema(labels.generator_quantity, {
      min: 0,
      max: 10,
      integer: true,
      required,
    }),
    generator_total: numberSchema(labels.generator_total, {
      min: 0,
      max: 100000,
      required,
    }),
  });

export const getOperationValidationSchema = (required: boolean) =>
  yup.object().shape({
    offline_stand_building: booleanSchema(labels.offline_stand_building, {
      required,
    }),
    auto_pipe_handling: booleanSchema(labels.auto_pipe_handling, { required }),
    dual_activity: booleanSchema(labels.dual_activity, { required }),
    drilltronic: booleanSchema(labels.drilltronic, { required }),
    subsea_drilling: booleanSchema(labels.subsea_drilling, { required }),
    enhanced_legs: booleanSchema(labels.enhanced_legs, { required }),
    dynamic_drilling_guide: booleanSchema(labels.dynamic_drilling_guide, {
      required,
    }),
    process_automation_platform: booleanSchema(
      labels.process_automation_platform,
      { required },
    ),
    automatic_tripping: booleanSchema(labels.automatic_tripping, { required }),
    closed_bus: booleanSchema(labels.closed_bus, { required }),
    scr: booleanSchema(labels.scr, { required }),
    hybrid: booleanSchema(labels.hybrid, { required }),
    hvac_heat_recovery: booleanSchema(labels.hvac_heat_recovery, { required }),
    freshwater_cooling_systems: booleanSchema(
      labels.freshwater_cooling_systems,
      { required },
    ),
    seawater_cooling_systems: booleanSchema(labels.seawater_cooling_systems, {
      required,
    }),
    operator_awareness_dashboard: booleanSchema(
      labels.operator_awareness_dashboard,
      { required },
    ),
    hpu_optimization: booleanSchema(labels.hpu_optimization, { required }),
    optimized_heat_tracing_system: booleanSchema(
      labels.optimized_heat_tracing_system,
      { required },
    ),
    floodlighting_optimization: booleanSchema(
      labels.floodlighting_optimization,
      { required },
    ),
    vfds_on_aux_machinery: booleanSchema(labels.vfds_on_aux_machinery, {
      required,
    }),
  });

export const publishedRigValidationSchema: yup.SchemaOf<FormValues> =
  mergeSchema(
    getGeneralValidationSchema(true),
    getCapacitiesValidationSchema(true),
    getOperationValidationSchema(true),
  ).required();
