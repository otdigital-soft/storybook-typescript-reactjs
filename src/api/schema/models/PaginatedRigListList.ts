/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RigList } from './RigList';

export type PaginatedRigListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<RigList>;
};
