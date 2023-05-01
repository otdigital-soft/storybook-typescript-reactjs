/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WellPlannerHelicopterType } from './WellPlannerHelicopterType';

export type PlannedHelicopterUseList = {
    readonly id: number;
    helicopter_type: WellPlannerHelicopterType;
    /**
     * Number of round trips
     */
    trips: number;
    /**
     * Flight time per round trip (minutes)
     */
    trip_duration: number;
    /**
     * Percentage exposure against current well
     */
    exposure_against_current_well: number;
    /**
     * Percentage quota obligation
     */
    quota_obligation: number;
};
