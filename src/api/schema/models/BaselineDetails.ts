/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BaselineDetailsSeason } from './BaselineDetailsSeason';
import type { ID } from './ID';

export type BaselineDetails = {
    readonly id: number;
    asset: ID;
    name: string;
    description: string;
    draft: boolean;
    readonly summer: BaselineDetailsSeason;
    readonly winter: BaselineDetailsSeason;
    readonly is_used: boolean;
    readonly updated_at: string;
};
