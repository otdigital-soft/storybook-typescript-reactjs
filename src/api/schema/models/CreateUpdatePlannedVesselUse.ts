/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetSeasonEnum } from './AssetSeasonEnum';

export type CreateUpdatePlannedVesselUse = {
    vessel_type: number;
    /**
     * Duration (days)
     */
    duration: number;
    /**
     * Percentage exposure against current well
     */
    exposure_against_current_well: number;
    /**
     * Waiting on weather contingency (%)
     */
    waiting_on_weather: number;
    season: AssetSeasonEnum;
    /**
     * Percentage quota obligation
     */
    quota_obligation: number;
};
