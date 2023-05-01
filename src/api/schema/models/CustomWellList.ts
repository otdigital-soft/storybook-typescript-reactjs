/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ID } from './ID';

export type CustomWellList = {
    readonly id: number;
    name?: string;
    readonly created_at: string;
    readonly updated_at: string;
    draft: boolean;
    readonly project: ID | null;
};
