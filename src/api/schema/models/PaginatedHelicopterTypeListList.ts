/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { HelicopterTypeList } from './HelicopterTypeList';

export type PaginatedHelicopterTypeListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<HelicopterTypeList>;
};
