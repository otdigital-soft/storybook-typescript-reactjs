/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PlanListWell } from './PlanListWell';

export type PlanList = {
    readonly id: number;
    name: string;
    description: string;
    readonly created_at: string;
    readonly updated_at: string;
    wells: Array<PlanListWell>;
};
