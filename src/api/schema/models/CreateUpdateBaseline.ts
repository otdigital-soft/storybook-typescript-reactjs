/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateUpdateBaselineSeason } from './CreateUpdateBaselineSeason';

export type CreateUpdateBaseline = {
    name: string;
    description: string;
    draft: boolean;
    summer: CreateUpdateBaselineSeason;
    winter: CreateUpdateBaselineSeason;
};
