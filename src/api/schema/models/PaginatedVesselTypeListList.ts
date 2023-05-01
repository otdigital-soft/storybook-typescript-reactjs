/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { VesselTypeList } from './VesselTypeList';

export type PaginatedVesselTypeListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<VesselTypeList>;
};
