/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConceptWellList } from './ConceptWellList';

export type PaginatedConceptWellListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<ConceptWellList>;
};
