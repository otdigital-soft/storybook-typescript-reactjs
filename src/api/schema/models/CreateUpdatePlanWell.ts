/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateUpdatePlanWell = {
    id: number;
    /**
     * Distance from previous well (nm)
     */
    distance_from_previous_location: number;
    /**
     * Distance to Helicopter base (nm)
     */
    distance_to_helicopter_base: number;
    /**
     * Distance to PSV base (nm)
     */
    distance_to_psv_base: number;
    /**
     * Distance to AHV base (nm)
     */
    distance_to_ahv_base: number;
    /**
     * Distance to Tug base (nm)
     */
    distance_to_tug_base: number;
    /**
     * Jackup positioning time (d)
     */
    jackup_positioning_time: number;
    /**
     * Semi positioning time (d)
     */
    semi_positioning_time: number;
    /**
     * Operational time (d)
     */
    operational_time: number;
};
