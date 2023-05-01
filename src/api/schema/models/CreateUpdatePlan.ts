/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateUpdatePlanWell } from './CreateUpdatePlanWell';
import type { CustomRig } from './CustomRig';

export type CreateUpdatePlan = {
    name: string;
    description: string;
    block_name: string;
    reference_rig: CustomRig;
    distance_from_tug_base_to_previous_well: number;
    wells: Array<CreateUpdatePlanWell>;
};
