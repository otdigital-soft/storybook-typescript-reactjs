/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DpClassEnum } from './DpClassEnum';
import type { DrillfloorEfficiencyEnum } from './DrillfloorEfficiencyEnum';
import type { RigStatusEnum } from './RigStatusEnum';
import type { TopsideDesignEnum } from './TopsideDesignEnum';

export type ConceptDrillshipDetails = {
    name: string;
    manager: string;
    design: string;
    build_yard: string;
    rig_status: RigStatusEnum;
    delivery_date: string;
    special_survey_due: string;
    end_of_last_contract: string;
    months_in_operation_last_year: number;
    months_in_operation_last_3_years: number;
    design_score: DrillfloorEfficiencyEnum;
    topside_design: TopsideDesignEnum;
    quarters_capacity: number;
    hull_breadth: number;
    hull_depth: number;
    hull_length: number;
    derrick_height: number;
    derrick_capacity: number;
    drawworks_power: number;
    total_cranes: number;
    crane_capacity: number;
    total_bop_rams: number;
    bop_diameter_wp_max: number;
    bop_wp_max: number;
    number_of_bop_stacks: number;
    mudpump_quantity: number;
    liquid_mud: number;
    mud_total_power: number;
    shaleshaker_total: number;
    engine_power: number;
    engine_quantity: number;
    engine_total: number;
    generator_power: number;
    generator_quantity: number;
    generator_total: number;
    offline_stand_building: boolean;
    auto_pipe_handling: boolean;
    dual_activity: boolean;
    drilltronic: boolean;
    dynamic_drilling_guide: boolean;
    process_automation_platform: boolean;
    automatic_tripping: boolean;
    closed_bus: boolean;
    scr: boolean;
    hybrid: boolean;
    hvac_heat_recovery: boolean;
    freshwater_cooling_systems: boolean;
    seawater_cooling_systems: boolean;
    operator_awareness_dashboard: boolean;
    hpu_optimization: boolean;
    optimized_heat_tracing_system: boolean;
    floodlighting_optimization: boolean;
    vfds_on_aux_machinery: boolean;
    equipment_load: DrillfloorEfficiencyEnum;
    drillfloor_efficiency: DrillfloorEfficiencyEnum;
    rig_water_depth: number;
    variable_load: number;
    hull_concept_score: number;
    hull_design_eco_score: number;
    dp: boolean;
    dp_class: DpClassEnum;
    draft_depth: number;
    displacement: number;
    riser_on_board_outfitted: number;
    riser_storage_inside_hull: boolean;
    split_funnels_free_stern_deck: boolean;
    dual_derrick: boolean;
    active_heave_drawwork: boolean;
    cmc_with_active_heave: boolean;
    ram_system: boolean;
    tripsaver: boolean;
    day_rate?: number | null;
    spread_cost?: number | null;
    /**
     * Number of tugs to be used
     */
    tugs_no_used: number;
    readonly id: number;
    readonly created_at: string;
    readonly updated_at: string;
};
