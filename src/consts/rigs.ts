import {
  AirgapEnum,
  DpClassEnum,
  DrillfloorEfficiencyEnum,
  RigStatusEnum,
  TopsideDesignEnum,
} from 'api/schema';

export const CREATE_RIG_FORM_STEPS = [
  {
    title: 'Rig type',
    description: 'Select rig type',
  },
  {
    title: 'Data',
    description: 'Select predefined data',
  },
  {
    title: 'Rig',
    description: 'Select rig',
  },
  {
    title: 'General',
    description: 'Basic information',
  },
  {
    title: 'Capacities',
    description: 'Capacities information',
  },
  {
    title: 'Operation and emission',
    description: 'Additional information',
  },
];

export const JACKUP_LABELS = {
  // General
  name: 'Rig name',
  manager: 'Manager',
  design: 'Design',
  build_yard: 'Build yard',
  rig_status: 'Rig status',
  delivery_date: 'Delivery date',
  special_survey_due: 'Special survey due',
  end_of_last_contract: 'End of last contract',
  months_in_operation_last_year: 'Months in operation last year',
  months_in_operation_last_3_years: 'Months in operation last 3 years',
  topside_design: 'Top side design',
  design_score: 'Design Score',
  day_rate: 'Day rate (USD/d)',
  spread_cost: 'Spread cost (USD)',
  tugs_no_used: 'Number of tugs to be used',
  jack_up_time: 'Jack up time (d)',
  jack_down_time: 'Jack down to move time (d)',

  // Capacities
  quarters_capacity: 'Quarters capacity',
  rig_water_depth: 'Rig water depth (ft)',
  variable_load: 'Variable load (t)',
  cantilever_lateral: 'Cantilever lateral (ft)',
  cantilever_reach: 'Cantilever reach (ft)',
  cantilever_capacity: 'Cantilever capacity (lbs)',
  derrick_height: 'Derrick height (ft)',
  derrick_capacity: 'Derrick capacity (lbs)',
  drawworks_power: 'Draw works (HP)',
  total_cranes: 'Total cranes',
  crane_capacity: 'Crane capacity',
  hull_breadth: 'Hull breadth (ft)',
  hull_depth: 'Hull depth (ft)',
  hull_length: 'Hull length (ft)',
  leg_length: 'Leg length (ft)',
  leg_spacing: 'Leg spacing (ft)',
  total_bop_rams: 'Total BOP rams',
  bop_diameter_wp_max: 'Bop diameter WP Max (in)',
  bop_wp_max: 'BOP WP Max (psi)',
  number_of_bop_stacks: 'Number of BOP stacks',
  mudpump_quantity: 'Mud pump quantity',
  liquid_mud: 'Liquid mud',
  mud_total_power: 'Mud total power (HP)',
  shaleshaker_total: 'Shale shaker total',
  engine_power: 'Engine power (HP)',
  engine_quantity: 'Engine quantity',
  engine_total: 'Engine total',
  generator_power: 'Generator power (KW)',
  generator_quantity: 'Generator quantity',
  generator_total: 'Generator total',
  // Operation & emission efficiency
  offline_stand_building: 'Offline stand building',
  auto_pipe_handling: 'Auto pipe handling',
  dual_activity: 'Dual activity',
  drilltronic: 'Drilltronic',
  subsea_drilling: 'Subsea drilling',
  enhanced_legs: 'Enhanced legs',
  dynamic_drilling_guide: 'Dynamic drilling guide',
  process_automation_platform: 'Process automation platform',
  automatic_tripping: 'Automatic tripping',
  closed_bus: 'Closed bus',
  scr: 'SCR',
  hybrid: 'Hybrid',
  hvac_heat_recovery: 'HVAC heat recovery',
  freshwater_cooling_systems: 'Freshwater cooling system',
  seawater_cooling_systems: 'Seawater cooling system',
  operator_awareness_dashboard: 'Operator awareness dashboard',
  hpu_optimization: 'HPU optimization',
  optimized_heat_tracing_system: 'Optimized heat tracing system',
  floodlighting_optimization: 'Floodlighting optimization',
  vfds_on_aux_machinery: 'VFD’s on AUX machinery',
};

export const SEMI_LABELS = {
  // General
  name: 'Rig Name',
  manager: 'Manager',
  design: 'Design',
  build_yard: 'Build yard',
  rig_status: 'Rig status',
  delivery_date: 'Delivery date',
  special_survey_due: 'Special survey due',
  drillfloor_efficiency: 'Drill floor efficiency',
  end_of_last_contract: 'End of last contract',
  months_in_operation_last_year: 'Months in operation last year',
  months_in_operation_last_3_years: 'Months in operation last 3 years',
  topside_design: 'Top side design',
  design_score: 'Design score',
  day_rate: 'Day rate (USD/d)',
  spread_cost: 'Spread cost (USD)',
  tugs_no_used: 'Number of tugs to be used',
  move_speed: 'Move speed (kn)',

  // Capacities
  quarters_capacity: 'Quarters capacity',
  rig_water_depth: 'Rig water depth (ft)',
  variable_load: 'Variable load (t)',
  derrick_height: 'Derrick height (ft)',
  derrick_capacity: 'Derrick capacity (lbs)',
  drawworks_power: 'Draw works (HP)',
  total_cranes: 'Total cranes',
  crane_capacity: 'Crane capacity',
  hull_breadth: 'Hull breadth (ft)',
  hull_depth: 'Hull depth (ft)',
  hull_length: 'Hull length (ft)',
  total_bop_rams: 'Total BOP rams',
  bop_diameter_wp_max: 'Bop diameter WP Max (in)',
  bop_wp_max: 'BOP WP Max (psi)',
  number_of_bop_stacks: 'Number of BOP stacks',
  mudpump_quantity: 'Mud pump quantity',
  liquid_mud: 'Liquid mud',
  mud_total_power: 'Mud total power (HP)',
  shaleshaker_total: 'Shale shaker total',
  engine_power: 'Engine power (HP)',
  engine_quantity: 'Engine quantity',
  engine_total: 'Engine total',
  generator_power: 'Generator power (KW)',
  generator_quantity: 'Generator quantity',
  generator_total: 'Generator total',
  equipment_load: 'Equipment load',
  airgap: 'Air gap',
  active_heave_drawwork: 'Active heave drawwork',
  draft_depth: 'Draft (ft)',
  cmc_with_active_heave: 'CNC with active heave',
  displacement: 'Displacement',
  ram_system: 'RAM system',
  hull_concept_score: 'Hull concept score',
  hull_design_eco_score: 'Hull design eco score',
  dp: 'DP',
  dp_class: 'DP class',
  thruster_assist: 'Thruster assist',
  total_anchors: 'Total anchors',
  dual_derrick: 'Dual derrick',
  anchor_standalone: 'Anchor standalone',

  // Operation step
  offline_stand_building: 'Offline stand building',
  auto_pipe_handling: 'Auto pipe handling',
  dual_activity: 'Dual activity',
  drilltronic: 'Drilltronic',
  dynamic_drilling_guide: 'Dynamic drilling guide',
  process_automation_platform: 'Process automation platform',
  automatic_tripping: 'Automatic tripping',
  closed_bus: 'Closed bus',
  scr: 'SCR',
  hybrid: 'Hybrid',
  hvac_heat_recovery: 'HVAC heat recovery',
  freshwater_cooling_systems: 'Freshwater cooling system',
  seawater_cooling_systems: 'Seawater cooling system',
  operator_awareness_dashboard: 'Operator awareness dashboard',
  hpu_optimization: 'HPU optimization',
  optimized_heat_tracing_system: 'Optimized heat tracing system',
  floodlighting_optimization: 'Floodlighting optimization',
  vfds_on_aux_machinery: 'VFD’s on AUX machinery',
  tripsaver: 'Tripsaver',
};

export const TOPSIDE_DESIGN_DISPLAY: Record<TopsideDesignEnum, string> = {
  [TopsideDesignEnum.CAMERON]: 'Cameron',
  [TopsideDesignEnum.MH]: 'MH',
  [TopsideDesignEnum.NOV]: 'NOV',
  [TopsideDesignEnum.OTHER]: 'Other',
};

export const RIG_STATUS_DISPLAY: Record<RigStatusEnum, string> = {
  [RigStatusEnum.COLD_STACKED]: 'Cold Stacked',
  [RigStatusEnum.DRILLING]: 'Drilling',
  [RigStatusEnum.MOBILIZING]: 'Mobilizing',
  [RigStatusEnum.UNDER_CONSTRUCTION]: 'Under Construction',
  [RigStatusEnum.WARM_STACKED]: 'Warm Stacker',
};

export const DRILLFLOOR_EFFICIENCY_DISPLAY: Record<
  DrillfloorEfficiencyEnum,
  string
> = {
  [DrillfloorEfficiencyEnum.HIGH]: 'High',
  [DrillfloorEfficiencyEnum.MEDIUM]: 'Medium',
  [DrillfloorEfficiencyEnum.LOW]: 'Low',
};

export const DP_CLASS_DISPLAY: Record<DpClassEnum, string> = {
  [DpClassEnum.DP2]: 'DP2',
  [DpClassEnum.DP3]: 'DP3',
  [DpClassEnum.DP_ER]: 'DP-ER',
};

export const EQUIPMENT_LOAD_DISPLAY = DRILLFLOOR_EFFICIENCY_DISPLAY;
export const DESIGN_SCORE_DISPLAY = DRILLFLOOR_EFFICIENCY_DISPLAY;

export const TOPSIDE_DESIGN_OPTIONS: {
  value: TopsideDesignEnum;
  label: string;
}[] = [
  {
    value: TopsideDesignEnum.CAMERON,
    label: TOPSIDE_DESIGN_DISPLAY[TopsideDesignEnum.CAMERON],
  },
  {
    value: TopsideDesignEnum.MH,
    label: TOPSIDE_DESIGN_DISPLAY[TopsideDesignEnum.MH],
  },
  {
    value: TopsideDesignEnum.NOV,
    label: TOPSIDE_DESIGN_DISPLAY[TopsideDesignEnum.NOV],
  },
  {
    value: TopsideDesignEnum.OTHER,
    label: TOPSIDE_DESIGN_DISPLAY[TopsideDesignEnum.OTHER],
  },
];

export const RIG_STATUS_OPTIONS: {
  value: RigStatusEnum;
  label: string;
}[] = [
  {
    value: RigStatusEnum.COLD_STACKED,
    label: RIG_STATUS_DISPLAY[RigStatusEnum.COLD_STACKED],
  },
  {
    value: RigStatusEnum.DRILLING,
    label: RIG_STATUS_DISPLAY[RigStatusEnum.DRILLING],
  },
  {
    value: RigStatusEnum.MOBILIZING,
    label: RIG_STATUS_DISPLAY[RigStatusEnum.MOBILIZING],
  },
  {
    value: RigStatusEnum.UNDER_CONSTRUCTION,
    label: RIG_STATUS_DISPLAY[RigStatusEnum.UNDER_CONSTRUCTION],
  },
  {
    value: RigStatusEnum.WARM_STACKED,
    label: RIG_STATUS_DISPLAY[RigStatusEnum.WARM_STACKED],
  },
];

export const DRILLFLOOR_EFFICIENCY_OPTIONS: {
  value: DrillfloorEfficiencyEnum;
  label: string;
}[] = [
  {
    value: DrillfloorEfficiencyEnum.HIGH,
    label: DESIGN_SCORE_DISPLAY[DrillfloorEfficiencyEnum.HIGH],
  },
  {
    value: DrillfloorEfficiencyEnum.MEDIUM,
    label: DESIGN_SCORE_DISPLAY[DrillfloorEfficiencyEnum.MEDIUM],
  },
  {
    value: DrillfloorEfficiencyEnum.LOW,
    label: DESIGN_SCORE_DISPLAY[DrillfloorEfficiencyEnum.LOW],
  },
];

export const DESIGN_SCORE_OPTIONS = DRILLFLOOR_EFFICIENCY_OPTIONS;
export const EQUIPMENT_LOAD_OPTIONS = DRILLFLOOR_EFFICIENCY_OPTIONS;

export const DP_CLASS_OPTIONS = [
  {
    value: DpClassEnum.DP2,
    label: DP_CLASS_DISPLAY[DpClassEnum.DP2],
  },
  {
    value: DpClassEnum.DP3,
    label: DP_CLASS_DISPLAY[DpClassEnum.DP3],
  },
  {
    value: DpClassEnum.DP_ER,
    label: DP_CLASS_DISPLAY[DpClassEnum.DP_ER],
  },
];

export const AIRGAP_OPTIONS = Object.values(AirgapEnum).map((value) => ({
  value: value,
  label: value,
}));

export const DRILLSHIP_LABELS = {
  // General
  name: 'Rig Name',
  manager: 'Manager',
  design: 'Design',
  build_yard: 'Build yard',
  rig_status: 'Rig status',
  delivery_date: 'Delivery date',
  special_survey_due: 'Special survey due',
  end_of_last_contract: 'End of last contract',
  months_in_operation_last_year: 'Months in operation last year',
  months_in_operation_last_3_years: 'Months in operation last 3 years',
  design_score: 'Design score',
  equipment_load: 'Equipment load',
  topside_design: 'Top side design',
  drillfloor_efficiency: 'Drill floor efficiency',
  day_rate: 'Day rate (USD/d)',
  spread_cost: 'Spread cost (USD)',
  tugs_no_used: 'Number of tugs to be used',

  // Capacities
  quarters_capacity: 'Quarters capacity',
  rig_water_depth: 'Rig water depth (ft)',
  variable_load: 'Variable load (t)',
  hull_concept_score: 'Hull concept score',
  hull_design_eco_score: 'Hull design eco score',
  dp: 'DP',
  dp_class: 'DP class',
  draft_depth: 'Draft (ft)',
  displacement: 'Displacement',
  hull_breadth: 'Hull breadth (ft)',
  hull_depth: 'Hull depth (ft)',
  hull_length: 'Hull length (ft)',
  derrick_height: 'Derrick height (ft)',
  derrick_capacity: 'Derrick capacity (lbs)',
  dual_derrick: 'Dual derrick',
  drawworks_power: 'Draw works (HP)',
  active_heave_drawwork: 'Active heave drawwork',
  cmc_with_active_heave: 'CNC with active heave',
  ram_system: 'RAM system',
  total_cranes: 'Total cranes',
  crane_capacity: 'Crane capacity',
  riser_on_board_outfitted: 'Riser on board outfitted',
  riser_storage_inside_hull: 'Riser storage inside hull',
  split_funnels_free_stern_deck: 'Split funnels / free stern deck',
  total_bop_rams: 'Total BOP rams',
  bop_diameter_wp_max: 'BOP diameter WP Max (in)',
  bop_wp_max: 'BOP WP Max (psi)',
  number_of_bop_stacks: 'Number of BOP stacks',
  mudpump_quantity: 'Mud pump quantity',
  liquid_mud: 'Liquid mud',
  mud_total_power: 'Mud total power (HP)',
  shaleshaker_total: 'Shale shaker total',
  engine_power: 'Engine power (HP)',
  engine_quantity: 'Engine quantity',
  engine_total: 'Engine total',
  generator_power: 'Generator power (KW)',
  generator_quantity: 'Generator quantity',
  generator_total: 'Generator total',

  // Operation step
  tripsaver: 'Tripsaver',
  offline_stand_building: 'Offline stand building',
  auto_pipe_handling: 'Auto pipe handling',
  dual_activity: 'Dual activity',
  drilltronic: 'Drilltronic',
  dynamic_drilling_guide: 'Dynamic drilling guide',
  process_automation_platform: 'Process automation platform',
  automatic_tripping: 'Automatic tripping',
  closed_bus: 'Closed bus',
  scr: 'SCR',
  hybrid: 'Hybrid',
  hvac_heat_recovery: 'HVAC heat recovery',
  freshwater_cooling_systems: 'Freshwater cooling system',
  seawater_cooling_systems: 'Seawater cooling system',
  operator_awareness_dashboard: 'Operator awareness dashboard',
  hpu_optimization: 'HPU optimization',
  optimized_heat_tracing_system: 'Optimized heat tracing system',
  floodlighting_optimization: 'Floodlighting optimization',
  vfds_on_aux_machinery: 'VFD’s on AUX machinery',
};

export enum DraftFormSteps {
  GENERAL = 3,
  CAPACITIES = 4,
  OPERATION = 5,
}

export const DRAFT_STEP_TITLES = {
  [DraftFormSteps.GENERAL]: 'General information',
  [DraftFormSteps.CAPACITIES]: 'Information about capacities',
  [DraftFormSteps.OPERATION]: 'Information about operation and emissions',
};
