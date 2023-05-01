/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetTypeEnum } from './AssetTypeEnum';

export type CompleteAssetList = {
    readonly id: number;
    name: string;
    type: AssetTypeEnum;
    active_baseline: string;
    active_emission_management_plan: string | null;
};
