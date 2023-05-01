/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ElementList } from './ElementList';

export type PaginatedElementListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<ElementList>;
};
