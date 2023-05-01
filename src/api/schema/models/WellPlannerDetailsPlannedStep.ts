/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetSeasonEnum } from './AssetSeasonEnum';
import type { WellPlannerMode } from './WellPlannerMode';
import type { WellPlannerPhase } from './WellPlannerPhase';
import type { WellStepMaterial } from './WellStepMaterial';

export type WellPlannerDetailsPlannedStep = {
    readonly id: number;
    readonly order: number;
    phase: WellPlannerPhase;
    mode: WellPlannerMode;
    /**
     * Phase duration in days
     */
    duration: number;
    /**
     * Waiting on weather contingency for selected days in percentage
     */
    waiting_on_weather: number;
    /**
     * Phase improved duration in days
     */
    improved_duration: number;
    season: AssetSeasonEnum;
    /**
     * CC&S quantity in Tons of CO2 per day
     */
    carbon_capture_storage_system_quantity?: number | null;
    /**
     * Well section length in meters
     */
    well_section_length: number;
    readonly emission_reduction_initiatives: Array<number>;
    comment?: string;
    external_energy_supply_enabled: boolean;
    external_energy_supply_quota: boolean;
    materials: Array<WellStepMaterial>;
};
