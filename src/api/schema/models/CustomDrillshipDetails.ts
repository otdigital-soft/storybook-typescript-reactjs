/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BlankEnum } from './BlankEnum';
import type { DpClassEnum } from './DpClassEnum';
import type { DrillfloorEfficiencyEnum } from './DrillfloorEfficiencyEnum';
import type { RigStatusEnum } from './RigStatusEnum';
import type { TopsideDesignEnum } from './TopsideDesignEnum';

export type CustomDrillshipDetails = {
    name?: string;
    manager?: string;
    design?: string;
    build_yard?: string;
    rig_status?: (RigStatusEnum | BlankEnum);
    delivery_date?: string | null;
    special_survey_due?: string | null;
    end_of_last_contract?: string | null;
    months_in_operation_last_year?: number | null;
    months_in_operation_last_3_years?: number | null;
    design_score?: (DrillfloorEfficiencyEnum | BlankEnum);
    topside_design?: (TopsideDesignEnum | BlankEnum);
    quarters_capacity?: number | null;
    hull_breadth?: number | null;
    hull_depth?: number | null;
    hull_length?: number | null;
    derrick_height?: number | null;
    derrick_capacity?: number | null;
    drawworks_power?: number | null;
    total_cranes?: number | null;
    crane_capacity?: number | null;
    total_bop_rams?: number | null;
    bop_diameter_wp_max?: number | null;
    bop_wp_max?: number | null;
    number_of_bop_stacks?: number | null;
    mudpump_quantity?: number | null;
    liquid_mud?: number | null;
    mud_total_power?: number | null;
    shaleshaker_total?: number | null;
    engine_power?: number | null;
    engine_quantity?: number | null;
    engine_total?: number | null;
    generator_power?: number | null;
    generator_quantity?: number | null;
    generator_total?: number | null;
    offline_stand_building?: boolean | null;
    auto_pipe_handling?: boolean | null;
    dual_activity?: boolean | null;
    drilltronic?: boolean | null;
    dynamic_drilling_guide?: boolean | null;
    process_automation_platform?: boolean | null;
    automatic_tripping?: boolean | null;
    closed_bus?: boolean | null;
    scr?: boolean | null;
    hybrid?: boolean | null;
    hvac_heat_recovery?: boolean | null;
    freshwater_cooling_systems?: boolean | null;
    seawater_cooling_systems?: boolean | null;
    operator_awareness_dashboard?: boolean | null;
    hpu_optimization?: boolean | null;
    optimized_heat_tracing_system?: boolean | null;
    floodlighting_optimization?: boolean | null;
    vfds_on_aux_machinery?: boolean | null;
    equipment_load?: (DrillfloorEfficiencyEnum | BlankEnum);
    drillfloor_efficiency?: (DrillfloorEfficiencyEnum | BlankEnum);
    rig_water_depth?: number | null;
    variable_load?: number | null;
    hull_concept_score?: number | null;
    hull_design_eco_score?: number | null;
    dp?: boolean | null;
    dp_class?: (DpClassEnum | BlankEnum);
    draft_depth?: number | null;
    displacement?: number | null;
    riser_on_board_outfitted?: number | null;
    riser_storage_inside_hull?: boolean | null;
    split_funnels_free_stern_deck?: boolean | null;
    dual_derrick?: boolean | null;
    active_heave_drawwork?: boolean | null;
    cmc_with_active_heave?: boolean | null;
    ram_system?: boolean | null;
    tripsaver?: boolean | null;
    day_rate?: number | null;
    spread_cost?: number | null;
    /**
     * Number of tugs to be used
     */
    tugs_no_used?: number | null;
    readonly id: number;
    readonly created_at: string;
    readonly updated_at: string;
    draft: boolean;
};
