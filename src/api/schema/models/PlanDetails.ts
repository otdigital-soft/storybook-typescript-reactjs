/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomRig } from './CustomRig';
import type { PlanDetailsWell } from './PlanDetailsWell';

export type PlanDetails = {
    readonly id: number;
    name: string;
    description: string;
    block_name: string;
    readonly reference_rig: CustomRig;
    distance_from_tug_base_to_previous_well: number;
    readonly created_at: string;
    readonly updated_at: string;
    readonly wells: Array<PlanDetailsWell>;
};
