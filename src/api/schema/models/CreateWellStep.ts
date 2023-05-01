/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetSeasonEnum } from './AssetSeasonEnum';
import type { CreateWellStepMaterial } from './CreateWellStepMaterial';

export type CreateWellStep = {
    phase: number;
    /**
     * Phase duration in days
     */
    duration: number;
    mode: number;
    season: AssetSeasonEnum;
    /**
     * Waiting on weather contingency for selected days in percentage
     */
    waiting_on_weather: number;
    /**
     * CC&S quantity in Tons of CO2 per day
     */
    carbon_capture_storage_system_quantity?: number | null;
    emission_reduction_initiatives?: Array<number>;
    /**
     * Well section length in meters
     */
    well_section_length: number;
    comment?: string;
    external_energy_supply_enabled: boolean;
    external_energy_supply_quota: boolean;
    materials: Array<CreateWellStepMaterial>;
};
