/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MaterialTypeList } from './MaterialTypeList';

export type PaginatedMaterialTypeListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<MaterialTypeList>;
};
