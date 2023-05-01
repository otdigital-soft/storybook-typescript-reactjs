/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomRig } from './CustomRig';

export type CreateUpdateStudyElement = {
    title: string;
    plan: number;
    metric: string;
    rigs: Array<CustomRig>;
};
