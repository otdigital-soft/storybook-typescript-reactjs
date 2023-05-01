/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetList } from './AssetList';

export type PaginatedAssetListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<AssetList>;
};
