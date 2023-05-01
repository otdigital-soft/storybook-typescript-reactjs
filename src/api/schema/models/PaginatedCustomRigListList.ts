/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomRigList } from './CustomRigList';

export type PaginatedCustomRigListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<CustomRigList>;
};
