/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomWellList } from './CustomWellList';

export type PaginatedCustomWellListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<CustomWellList>;
};
