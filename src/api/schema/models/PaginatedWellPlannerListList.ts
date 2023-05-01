/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WellPlannerList } from './WellPlannerList';

export type PaginatedWellPlannerListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<WellPlannerList>;
};
