import { UpdateCustomJackupRig } from 'api/schema';
import {
  getGeneralValidationSchema,
  getCapacitiesValidationSchema,
  getOperationValidationSchema,
} from 'containers/UpdateJackupForm/schema';
import { DraftFormSteps } from 'consts/rigs';

export const stepValidationSchemas = {
  [DraftFormSteps.GENERAL]: getGeneralValidationSchema(false),
  [DraftFormSteps.CAPACITIES]: getCapacitiesValidationSchema(false),
  [DraftFormSteps.OPERATION]: getOperationValidationSchema(false),
};

export const stepFieldMap: {
  [key in DraftFormSteps]: (keyof UpdateCustomJackupRig)[];
} = {
  [DraftFormSteps.GENERAL]: [
    'name',
    'manager',
    'design',
    'build_yard',
    'rig_status',
    'delivery_date',
    'special_survey_due',
    'end_of_last_contract',
    'months_in_operation_last_year',
    'months_in_operation_last_3_years',
    'topside_design',
    'day_rate',
    'spread_cost',
    'tugs_no_used',
    'jack_up_time',
    'jack_down_time',
    'draft',
  ],
  [DraftFormSteps.CAPACITIES]: [
    'cantilever_capacity',
    'quarters_capacity',
    'rig_water_depth',
    'variable_load',
    'cantilever_lateral',
    'cantilever_reach',
    'derrick_height',
    'derrick_capacity',
    'drawworks_power',
    'total_cranes',
    'crane_capacity',
    'hull_breadth',
    'hull_depth',
    'hull_length',
    'leg_length',
    'leg_spacing',
    'total_bop_rams',
    'bop_diameter_wp_max',
    'bop_wp_max',
    'number_of_bop_stacks',
    'mudpump_quantity',
    'liquid_mud',
    'mud_total_power',
    'shaleshaker_total',
    'engine_power',
    'engine_quantity',
    'engine_total',
    'generator_power',
    'generator_quantity',
    'generator_total',
    'draft',
  ],
  [DraftFormSteps.OPERATION]: [
    'offline_stand_building',
    'auto_pipe_handling',
    'dual_activity',
    'drilltronic',
    'subsea_drilling',
    'enhanced_legs',
    'dynamic_drilling_guide',
    'process_automation_platform',
    'automatic_tripping',
    'closed_bus',
    'scr',
    'hybrid',
    'hvac_heat_recovery',
    'freshwater_cooling_systems',
    'seawater_cooling_systems',
    'operator_awareness_dashboard',
    'hpu_optimization',
    'optimized_heat_tracing_system',
    'floodlighting_optimization',
    'vfds_on_aux_machinery',
    'draft',
  ],
};