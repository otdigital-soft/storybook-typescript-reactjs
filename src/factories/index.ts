import { faker } from '@faker-js/faker';
import {
  AirgapEnum,
  AssetSeasonEnum,
  AssetTypeEnum,
  CompleteAssetList,
  ConceptEMPElement,
  ConceptWellDetails,
  ConceptWellList,
  CurrentStepEnum,
  CustomDrillshipDetails,
  CustomEMPElement,
  CustomJackupRigDetails,
  CustomRigList,
  CustomSemiRigDetails,
  CustomWellDetails,
  CustomWellList,
  DpClassEnum,
  DrillfloorEfficiencyEnum,
  EmissionReductionInitiativeList,
  EmissionReductionInitiativeTypeEnum,
  EMP,
  ExtensionSectionMudTypeEnum,
  HelicopterTypeList,
  MaterialCategoryEnum,
  MaterialTypeList,
  MetoceanDataEnum,
  PlanDetails,
  PlanDetailsWell,
  PlanList,
  PlanListWell,
  PnaEnum,
  ProjectDetails,
  ProjectList,
  RigStatusEnum,
  RigTypeEnum,
  SearchResult,
  StudyElementList,
  StudyElementRig,
  StudyMetric,
  TopsideDesignEnum,
  Type357Enum,
  VesselTypeList,
  WellPlannerDetails,
  WellPlannerWellTypeEnum,
  WellSeasonEnum,
} from 'api/schema';
import { Factory } from 'rosie';

export const ProjectListFactory = Factory.define<ProjectList>('project')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('description', () => faker.lorem.sentence())
  .attr('created_at', () => faker.date.past().toISOString())
  .attr('updated_at', () => faker.date.past().toISOString());

export const CustomWellListFactory = Factory.define<CustomWellList>(
  'customWellList',
)
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('created_at', () => faker.date.past().toISOString())
  .attr('updated_at', () => faker.date.past().toISOString())
  .attr('draft', () => {
    return faker.datatype.boolean();
  })
  .attr('project', () => {
    return null;
  });

export const ConceptWellListFactory = Factory.define<ConceptWellList>(
  'conceptWellList',
)
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('created_at', () => faker.date.past().toISOString())
  .attr('updated_at', () => faker.date.past().toISOString());

export const CustomRigFactory = Factory.define<CustomRigList>('customRig')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('created_at', () => faker.date.past().toISOString())
  .attr('updated_at', () => faker.date.past().toISOString())
  .attr('draft', () => faker.datatype.boolean())
  .attr('type', () => {
    return faker.random.arrayElement([RigTypeEnum.SEMI, RigTypeEnum.JACKUP]);
  });

export const ProjectDetailsFactory = Factory.define<ProjectDetails>(
  'projectDetails',
)
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('description', () => faker.lorem.sentence())
  .attr('tugs_day_rate', () => faker.datatype.number())
  .attr('tugs_avg_move_fuel_consumption', () => faker.datatype.number())
  .attr('tugs_avg_transit_fuel_consumption', () => faker.datatype.number())
  .attr('tugs_move_speed', () => faker.datatype.number())
  .attr('tugs_transit_speed', () => faker.datatype.number())
  .attr('ahv_no_used', () => faker.datatype.number())
  .attr('ahv_no_days_per_location', () => faker.datatype.number())
  .attr('ahv_avg_fuel_consumption', () => faker.datatype.number())
  .attr('ahv_day_rate', () => faker.datatype.number())
  .attr('psv_calls_per_week', () => faker.datatype.number())
  .attr('psv_types', () => faker.lorem.words())
  .attr('psv_avg_fuel_transit_consumption', () => faker.datatype.number())
  .attr('psv_avg_fuel_dp_consumption', () => faker.datatype.number())
  .attr('psv_day_rate', () => faker.datatype.number())
  .attr('psv_speed', () => faker.datatype.number())
  .attr('psv_loading_time', () => faker.datatype.number())
  .attr('psv_fuel_price', () => faker.datatype.number())
  .attr('helicopter_no_flights_per_week', () => faker.datatype.number())
  .attr('helicopter_types', () => faker.lorem.words())
  .attr('helicopter_avg_fuel_consumption', () => faker.datatype.number())
  .attr('helicopter_rate_per_trip', () => faker.datatype.number())
  .attr('helicopter_fuel_price', () => faker.datatype.number())
  .attr('helicopter_cruise_speed', () => faker.datatype.number())
  .attr('marine_diesel_oil_price', () => faker.datatype.number())
  .attr('co2_tax', () => faker.datatype.number())
  .attr('nox_tax', () => faker.datatype.number())
  .attr('fuel_total_price', () => faker.datatype.number())
  .attr('fuel_density', () => faker.datatype.number())
  .attr('co2_emission_per_tonne_fuel', () => faker.datatype.number())
  .attr('co2_emission_per_m3_fuel', () => faker.datatype.number())
  .attr('created_at', () => faker.date.past().toISOString())
  .attr('updated_at', () => faker.date.past().toISOString());

export const CustomRigListFactory = Factory.define<CustomRigList>(
  'customRigList',
)
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('created_at', () => faker.date.past().toISOString())
  .attr('updated_at', () => faker.date.past().toISOString())
  .attr('draft', () => faker.datatype.boolean())
  .attr('type', () => {
    return faker.random.arrayElement([RigTypeEnum.SEMI, RigTypeEnum.JACKUP]);
  });

export const PlanWellFactory = Factory.define<PlanListWell>('planWell')
  .sequence('id')
  .attr('name', () => faker.lorem.words());

export const PlanFactory = Factory.define<PlanList>('plan')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('description', () => faker.lorem.sentence())
  .attr('created_at', () => faker.date.past().toISOString())
  .attr('updated_at', () => faker.date.past().toISOString())
  .attr('wells', () => {
    return PlanWellFactory.buildList(faker.datatype.number(5));
  });

export const ProjectPlanWellFactory = Factory.define<PlanDetailsWell>(
  'projectPlanWell',
)
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('distance_from_previous_location', () =>
    faker.datatype.number({ min: 1, max: 100 }),
  )
  .attr('distance_to_helicopter_base', () =>
    faker.datatype.number({ min: 1, max: 100 }),
  )
  .attr('distance_to_psv_base', () =>
    faker.datatype.number({ min: 1, max: 100 }),
  )
  .attr('distance_to_ahv_base', () =>
    faker.datatype.number({ min: 1, max: 100 }),
  )
  .attr('distance_to_tug_base', () =>
    faker.datatype.number({ min: 1, max: 100 }),
  )
  .attr('jackup_positioning_time', () =>
    faker.datatype.number({ min: 1, max: 100 }),
  )
  .attr('semi_positioning_time', () =>
    faker.datatype.number({ min: 1, max: 100 }),
  )
  .attr('operational_time', () => faker.datatype.number({ min: 14, max: 28 }));

export const ProjectPlanFactory = Factory.define<PlanDetails>('projectPlan')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('description', () => faker.lorem.sentence())
  .attr('block_name', () => faker.lorem.words())
  .attr('distance_from_tug_base_to_previous_well', () =>
    faker.datatype.number({ min: 1, max: 100 }),
  )
  .attr('reference_rig', () => ({
    id: 1,
    type: RigTypeEnum.DRILLSHIP,
  }))
  .attr('wells', () => {
    return ProjectPlanWellFactory.buildList(faker.datatype.number(5));
  });

export const ConceptEMPElementFactory = Factory.define<ConceptEMPElement>(
  'conceptEMPElement',
)
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('subarea', () => faker.lorem.words())
  .attr('percentage_improvement', () =>
    faker.datatype.number({ min: 1, max: 10 }),
  );

export const CustomEMPElementFactory = Factory.define<CustomEMPElement>(
  'customEMPElement',
)
  .sequence('id')
  .attr('baseline_average', () =>
    faker.datatype.number({ min: 2000, max: 3000 }),
  )
  .attr('target_average', () => faker.datatype.number({ min: 1000, max: 2000 }))
  .attr('concept', () => ConceptEMPElementFactory.build());

export const CustomEMPFactory = Factory.define<EMP>('customEMP')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('description', () => faker.lorem.sentence())
  .attr('api_description', () => faker.lorem.sentence())
  .attr('start_date', () => faker.date.past().toISOString())
  .attr('end_date', () => faker.date.future().toISOString())
  .attr('total_rig_baseline_average', () =>
    faker.datatype.number({ min: 1000, max: 2000 }),
  )
  .attr('total_rig_target_average', () =>
    faker.datatype.number({ min: 1000, max: 1500 }),
  )
  .attr('elements', () => {
    return CustomEMPElementFactory.buildList(faker.datatype.number(5));
  });

export const StudyRigFactory = Factory.define<StudyElementRig>('studyRig')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('type', () => {
    return faker.random.arrayElement([RigTypeEnum.SEMI, RigTypeEnum.JACKUP]);
  })
  .attr('value', () => faker.datatype.number({ min: 1000, max: 2000 }));

export const StudyMetricFactory = Factory.define<StudyMetric>('studyMetric')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('unit', () => 'MW');

export const StudyElementListFactory = Factory.define<StudyElementList>(
  'studyElementList',
)
  .sequence('id')
  .sequence('order')
  .attr('title', () => faker.lorem.words())
  .attr('metric', () => StudyMetricFactory.build())
  .attr('plan', faker.datatype.number({ min: 1, max: 10 }));

export const CustomJackupRigDetailsFactory = Factory.define<
  Required<CustomJackupRigDetails>
>('customJackupRigDetails')
  .sequence('id')
  .attrs({
    created_at: '2022-02-23T12:36:32.637000Z',
    updated_at: '2022-02-23T12:37:12.043000Z',
    name: 'Custom Jackup 1',
    manager: 'Custom Jackup Manager 1',
    design: 'Custom Jackup Design 1',
    build_yard: 'Custom Jackup Yard 1',
    rig_status: RigStatusEnum.DRILLING,
    delivery_date: '2014-07-30',
    special_survey_due: '1980-07-04',
    end_of_last_contract: '2021-12-08',
    months_in_operation_last_year: 0,
    months_in_operation_last_3_years: 0,
    design_score: DrillfloorEfficiencyEnum.LOW,
    topside_design: TopsideDesignEnum.NOV,
    spread_cost: null,
    day_rate: null,
    tugs_no_used: 3,
    jack_down_time: 1.3,
    jack_up_time: 1.4,
    quarters_capacity: 10.0,
    rig_water_depth: 0.0,
    variable_load: 0.0,
    hull_breadth: 100.0,
    hull_depth: 10.0,
    hull_length: 100.0,
    derrick_height: 50.0,
    derrick_capacity: 500000.0,
    drawworks_power: 1000.0,
    total_cranes: 1.0,
    crane_capacity: 10.0,
    total_bop_rams: 1.0,
    bop_diameter_wp_max: 10.0,
    bop_wp_max: 5000.0,
    number_of_bop_stacks: 1.0,
    mudpump_quantity: 1,
    liquid_mud: 1000.0,
    mud_total_power: 1000.0,
    shaleshaker_total: 0.0,
    engine_power: 0.0,
    engine_quantity: 0,
    engine_total: 0.0,
    generator_power: 0.0,
    generator_quantity: 0,
    generator_total: 0.0,
    offline_stand_building: false,
    auto_pipe_handling: false,
    dual_activity: false,
    drilltronic: false,
    dynamic_drilling_guide: false,
    process_automation_platform: false,
    automatic_tripping: false,
    closed_bus: false,
    scr: false,
    hybrid: false,
    hvac_heat_recovery: false,
    freshwater_cooling_systems: false,
    seawater_cooling_systems: false,
    operator_awareness_dashboard: false,
    hpu_optimization: false,
    optimized_heat_tracing_system: false,
    floodlighting_optimization: false,
    vfds_on_aux_machinery: false,
    cantilever_reach: 0.0,
    cantilever_lateral: 0.0,
    cantilever_capacity: 1000000.0,
    leg_length: 100.0,
    leg_spacing: 100.0,
    subsea_drilling: false,
    enhanced_legs: false,
    draft: false,
  });

export const CustomSemiRigDetailsFactory = Factory.define<
  Required<CustomSemiRigDetails>
>('customSemiRigDetails')
  .sequence('id')
  .attrs({
    created_at: '2022-02-22T17:41:28Z',
    updated_at: '2022-02-23T12:23:33.692000Z',
    name: 'Custom Semi 1',
    manager: 'Some Semi Manager 1',
    design: 'Some Semi Design 1',
    build_yard: 'Some Semi Yard 1',
    rig_status: RigStatusEnum.DRILLING,
    delivery_date: '2022-02-22',
    special_survey_due: '2022-02-22',
    end_of_last_contract: '2022-02-22',
    months_in_operation_last_year: 4,
    months_in_operation_last_3_years: 12,
    design_score: DrillfloorEfficiencyEnum.LOW,
    topside_design: TopsideDesignEnum.NOV,
    tugs_no_used: 3,
    spread_cost: null,
    day_rate: null,
    quarters_capacity: 123.0,
    rig_water_depth: 140.0,
    variable_load: 213.0,
    hull_breadth: 400.0,
    hull_depth: 100.0,
    hull_length: 500.0,
    derrick_height: 200.0,
    derrick_capacity: 500000.0,
    drawworks_power: 1000.0,
    total_cranes: 10.0,
    crane_capacity: 300.0,
    total_bop_rams: 10.0,
    bop_diameter_wp_max: 30.0,
    bop_wp_max: 5001.0,
    number_of_bop_stacks: 2.0,
    mudpump_quantity: 10,
    liquid_mud: 1000.0,
    mud_total_power: 20000.0,
    shaleshaker_total: 10.0,
    engine_power: 20000.0,
    engine_quantity: 10,
    engine_total: 100000.0,
    generator_power: 20000.0,
    generator_quantity: 10,
    generator_total: 100000.0,
    offline_stand_building: true,
    auto_pipe_handling: true,
    dual_activity: true,
    drilltronic: true,
    dynamic_drilling_guide: true,
    process_automation_platform: true,
    automatic_tripping: true,
    closed_bus: true,
    scr: true,
    hybrid: true,
    hvac_heat_recovery: true,
    freshwater_cooling_systems: true,
    seawater_cooling_systems: true,
    operator_awareness_dashboard: true,
    hpu_optimization: true,
    optimized_heat_tracing_system: true,
    floodlighting_optimization: true,
    vfds_on_aux_machinery: true,
    equipment_load: DrillfloorEfficiencyEnum.LOW,
    drillfloor_efficiency: DrillfloorEfficiencyEnum.LOW,
    hull_concept_score: 8.0,
    hull_design_eco_score: 8.0,
    dp: false,
    dp_class: DpClassEnum.DP2,
    thruster_assist: true,
    total_anchors: 15.0,
    anchor_standalone: false,
    airgap: AirgapEnum.S,
    draft_depth: 144.0,
    displacement: 5001.0,
    dual_derrick: false,
    active_heave_drawwork: false,
    cmc_with_active_heave: false,
    ram_system: false,
    tripsaver: true,
    draft: false,
  });

export const CustomWellDetailsFactory = Factory.define<
  Required<CustomWellDetails>
>('customWellDetails')
  .sequence('id')
  .attrs({
    name: 'Custom Well 2',
    type: Type357Enum.EXPLORATION,
    top_hole: PnaEnum.DEMANDING,
    transport_section: PnaEnum.DEMANDING,
    reservoir_section: PnaEnum.DEMANDING,
    completion: PnaEnum.DEMANDING,
    pna: PnaEnum.DEMANDING,
    season: WellSeasonEnum.WINTER,
    water_depth: 300.0,
    metocean_data: MetoceanDataEnum.GENERIC_BARENTS_SEA,
    metocean_days_above_hs_5: 5.0,
    planned_time_per_well: 0.0,
    tvd_from_msl: 0.0,
    md_from_msl: 0.0,
    expected_reservoir_pressure: 0.0,
    expected_reservoir_temperature: 0.0,
    top_hole_section_hole_size: 0.0,
    surface_casing_section_hole_size: 0.0,
    intermediate_casing_section_hole_size: 0.0,
    production_casing_section_hole_size: 0.0,
    extension_section_hole_size: 0.0,
    intermediate_casing_section_mud_type: ExtensionSectionMudTypeEnum.OIL_BASED,
    production_casing_section_mud_type: ExtensionSectionMudTypeEnum.OIL_BASED,
    extension_section_mud_type: ExtensionSectionMudTypeEnum.OIL_BASED,
    intermediate_casing_section_mud_density: 0.0,
    production_casing_section_mud_density: 0.0,
    extension_section_mud_density: 0.0,
    conductor_size: 0.0,
    conductor_weight: 0.0,
    conductor_tvd_shoe_depth: 0.0,
    conductor_md_shoe_depth: 0.0,
    surface_casing_size: 0.0,
    surface_casing_weight: 0.0,
    surface_casing_tvd_shoe_depth: 0.0,
    surface_casing_md_shoe_depth: 0.0,
    intermediate_casing_size: 0.0,
    intermediate_casing_weight: 0.0,
    intermediate_casing_tvd_shoe_depth: 0.0,
    intermediate_casing_md_shoe_depth: 0.0,
    production_casing_size: 0.0,
    production_casing_weight: 0.0,
    production_casing_tvd_shoe_depth: 0.0,
    production_casing_md_shoe_depth: 0.0,
    liner_other_size: 0.0,
    liner_other_weight: 0.0,
    liner_other_tvd_shoe_depth: 0.0,
    liner_other_md_shoe_depth: 0.0,
    no_well_to_be_completed: 0,
    planned_time_per_completion_operation: 0,
    subsea_xmas_tree_size: 0.0,
    xt_weight: 0.0,
    lrp_size: 0.0,
    lrp_weight: 0.0,
    xt_running_tool_size: 0.0,
    xt_running_tool_weight: 0.0,
    draft: false,
    created_at: '2022-02-24T12:36:42.059000Z',
    updated_at: '2022-04-19T13:24:02.599874Z',
  });

export const ConceptWellDetailsFactory = Factory.define<
  Required<ConceptWellDetails>
>('conceptWellDetails')
  .sequence('id')
  .attrs({
    name: 'Concept Well 2',
    type: Type357Enum.EXPLORATION,
    top_hole: PnaEnum.MEDIUM,
    transport_section: PnaEnum.DEMANDING,
    reservoir_section: PnaEnum.DEMANDING,
    completion: PnaEnum.DEMANDING,
    pna: PnaEnum.DEMANDING,
    season: WellSeasonEnum.SPECIFIC,
    water_depth: 300.0,
    metocean_data: MetoceanDataEnum.GENERIC_BARENTS_SEA,
    metocean_days_above_hs_5: 0.0,
    planned_time_per_well: 0.0,
    tvd_from_msl: 0.0,
    md_from_msl: 0.0,
    expected_reservoir_pressure: 0.0,
    expected_reservoir_temperature: 0.0,
    top_hole_section_hole_size: 0.0,
    surface_casing_section_hole_size: 0.0,
    intermediate_casing_section_hole_size: 0.0,
    production_casing_section_hole_size: 0.0,
    extension_section_hole_size: 0.0,
    intermediate_casing_section_mud_type: ExtensionSectionMudTypeEnum.OIL_BASED,
    production_casing_section_mud_type: ExtensionSectionMudTypeEnum.OIL_BASED,
    extension_section_mud_type: ExtensionSectionMudTypeEnum.OIL_BASED,
    intermediate_casing_section_mud_density: 0.0,
    production_casing_section_mud_density: 0.0,
    extension_section_mud_density: 0.0,
    conductor_size: 0.0,
    conductor_weight: 0.0,
    conductor_tvd_shoe_depth: 0.0,
    conductor_md_shoe_depth: 0.0,
    surface_casing_size: 0.0,
    surface_casing_weight: 0.0,
    surface_casing_tvd_shoe_depth: 0.0,
    surface_casing_md_shoe_depth: 0.0,
    intermediate_casing_size: 0.0,
    intermediate_casing_weight: 0.0,
    intermediate_casing_tvd_shoe_depth: 0.0,
    intermediate_casing_md_shoe_depth: 0.0,
    production_casing_size: 0.0,
    production_casing_weight: 0.0,
    production_casing_tvd_shoe_depth: 0.0,
    production_casing_md_shoe_depth: 0.0,
    liner_other_size: 0.0,
    liner_other_weight: 0.0,
    liner_other_tvd_shoe_depth: 0.0,
    liner_other_md_shoe_depth: 0.0,
    no_well_to_be_completed: 0,
    planned_time_per_completion_operation: 0,
    subsea_xmas_tree_size: 0.0,
    xt_weight: 0.0,
    lrp_size: 0.0,
    lrp_weight: 0.0,
    xt_running_tool_size: 0.0,
    xt_running_tool_weight: 0.0,
    created_at: '2022-02-24T12:36:42.059000Z',
    updated_at: '2022-04-19T13:24:02.599874Z',
  });

export const SearchResultFactory = Factory.define<SearchResult>('searchResult')
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('type', () => {
    return faker.random.arrayElement([
      'Well',
      'Project',
      'Jackup Rig',
      'Semi Rig',
    ]);
  })
  .attr('url', () => '/');

export const CustomDrillshipDetailsFactory = Factory.define<
  Required<CustomDrillshipDetails>
>('customDrillshipDetails')
  .sequence('id')
  .attrs({
    active_heave_drawwork: false,
    auto_pipe_handling: false,
    automatic_tripping: false,
    bop_diameter_wp_max: 10,
    bop_wp_max: 5000,
    build_yard: 'Build yard',
    closed_bus: false,
    cmc_with_active_heave: false,
    crane_capacity: 10,
    created_at: '2022-05-19T13:05:53.397000Z',
    delivery_date: '2022-05-19',
    derrick_capacity: 500000,
    derrick_height: 50,
    design: 'Design',
    design_score: DrillfloorEfficiencyEnum.LOW,
    day_rate: null,
    spread_cost: null,
    tugs_no_used: 3,
    displacement: 5000,
    dp: false,
    dp_class: DpClassEnum.DP3,
    draft: false,
    draft_depth: 50,
    drawworks_power: 1000,
    drillfloor_efficiency: DrillfloorEfficiencyEnum.LOW,
    drilltronic: false,
    dual_activity: false,
    dual_derrick: false,
    dynamic_drilling_guide: false,
    end_of_last_contract: '2022-05-19',
    engine_power: 1,
    engine_quantity: 1,
    engine_total: 1,
    equipment_load: DrillfloorEfficiencyEnum.LOW,
    floodlighting_optimization: false,
    freshwater_cooling_systems: false,
    generator_power: 1,
    generator_quantity: 1,
    generator_total: 1,
    hpu_optimization: false,
    hull_breadth: 100,
    hull_concept_score: 1,
    hull_depth: 10,
    hull_design_eco_score: 1,
    hull_length: 100,
    hvac_heat_recovery: false,
    hybrid: false,
    liquid_mud: 1000,
    manager: 'Manager',
    months_in_operation_last_3_years: 1,
    months_in_operation_last_year: 1,
    mud_total_power: 1000,
    mudpump_quantity: 1,
    name: 'Custom Drillship 1',
    number_of_bop_stacks: 1,
    offline_stand_building: false,
    operator_awareness_dashboard: false,
    optimized_heat_tracing_system: false,
    process_automation_platform: false,
    quarters_capacity: 10,
    ram_system: false,
    rig_status: RigStatusEnum.DRILLING,
    rig_water_depth: 1,
    riser_on_board_outfitted: 1,
    riser_storage_inside_hull: false,
    scr: false,
    seawater_cooling_systems: false,
    shaleshaker_total: 1,
    special_survey_due: '2022-05-19',
    split_funnels_free_stern_deck: false,
    topside_design: TopsideDesignEnum.NOV,
    total_bop_rams: 1,
    total_cranes: 1,
    tripsaver: false,
    updated_at: '2022-05-19T13:18:26.593000Z',
    variable_load: 1,
    vfds_on_aux_machinery: false,
  });

export const CompleteAssetListFactory = Factory.define<CompleteAssetList>(
  'completeAssetList',
)
  .sequence('id')
  .attr('name', () => faker.lorem.words())
  .attr('type', () => AssetTypeEnum.SEMI)
  .attr('active_baseline', () => faker.lorem.words())
  .attr('active_emission_management_plan', () => faker.lorem.words());

export const WellPlannerDetailsFactory = Factory.define<WellPlannerDetails>(
  'wellPlannerDetails',
)
  .sequence('id')
  .attrs({
    asset: { id: 1, name: 'Test rig' },
    name: {
      id: 1,
      name: 'Test well',
    },
    sidetrack: 'Test sidetrack',
    description: '',
    field: 'Test field',
    location: 'Test location',
    fuel_type: 'Fuel type',
    type: WellPlannerWellTypeEnum.PRODUCTION,
    current_step: CurrentStepEnum.WELL_PLANNING,
    fuel_density: 0,
    co2_per_fuel: 0,
    nox_per_fuel: 0,
    co2_tax: 0,
    nox_tax: 0,
    fuel_cost: 0,
    planned_start_date: '2014-07-30',
    planned_helicopter_uses: [
      {
        id: 1,
        helicopter_type: {
          id: 1,
          type: 'Sikorsky S-92',
        },
        trips: 12,
        trip_duration: 23,
        exposure_against_current_well: 100,
        quota_obligation: 100,
      },
    ],
    planned_vessel_uses: [
      {
        id: 1,
        vessel_type: { id: 2, type: 'Vessel type' },
        duration: 5.0,
        season: AssetSeasonEnum.SUMMER,
        waiting_on_weather: 50,
        quota_obligation: 100,
        exposure_against_current_well: 100,
      },
    ],
  });

export const HelicopterTypeListFactory = Factory.define<HelicopterTypeList>(
  'helicopterTypeList',
)
  .sequence('id')
  .attrs({
    type: 'Sikorsky S-92',
    fuel_density: 1,
    co2_per_fuel: 2,
    nox_per_fuel: 3,
    fuel_consumption: 4,
    fuel_cost: 5,
    co2_tax: 6,
    nox_tax: 7,
  });

export const VesselTypeListFactory = Factory.define<VesselTypeList>(
  'vesselTypeList',
)
  .sequence('id')
  .attrs({
    type: 'Anchor handling tug supply vessel (AHTS)',
    fuel_type: 'Fuel type',
    fuel_consumption_summer: 1,
    fuel_consumption_winter: 2,
    co2_per_fuel: 3,
    nox_per_fuel: 4,
    co2_tax: 5,
  });

export const EmissionReductionInitiativeListFactory =
  Factory.define<EmissionReductionInitiativeList>(
    'emissionReductionInitiativeList',
  )
    .sequence('id')
    .attr('name', () => `${faker.lorem.word()} initiative`)
    .attr('type', () => {
      return faker.random.arrayElement(
        Object.keys(EmissionReductionInitiativeTypeEnum),
      ) as EmissionReductionInitiativeTypeEnum;
    });

export const MaterialTypeListFactory = Factory.define<MaterialTypeList>(
  'materialTypeList',
)
  .sequence('id')
  .attr('category', () => {
    return faker.random.arrayElement([
      MaterialCategoryEnum.CEMENT,
      MaterialCategoryEnum.STEEL,
      MaterialCategoryEnum.BULK,
      MaterialCategoryEnum.CHEMICALS,
    ]);
  })
  .attrs({
    type: 'Material type',
    co2: 100,
    unit: 'Ton',
  });
