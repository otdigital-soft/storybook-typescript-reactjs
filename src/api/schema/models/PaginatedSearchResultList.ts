/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SearchResult } from './SearchResult';

export type PaginatedSearchResultList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<SearchResult>;
};
