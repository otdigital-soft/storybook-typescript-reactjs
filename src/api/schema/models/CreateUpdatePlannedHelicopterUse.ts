/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateUpdatePlannedHelicopterUse = {
    helicopter_type: number;
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
