/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CurrentStepEnum } from './CurrentStepEnum';
import type { ID } from './ID';
import type { WellName } from './WellName';
import type { WellPlannerListAsset } from './WellPlannerListAsset';
import type { WellPlannerWellTypeEnum } from './WellPlannerWellTypeEnum';

export type WellPlannerList = {
    readonly id: number;
    name: WellName;
    sidetrack: string;
    asset: WellPlannerListAsset;
    field: string;
    location: string;
    description?: string;
    type: WellPlannerWellTypeEnum;
    planned_start_date: string;
    actual_start_date?: string | null;
    current_step: CurrentStepEnum;
    baseline: ID;
};
