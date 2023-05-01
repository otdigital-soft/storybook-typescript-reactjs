/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetTypeEnum } from './AssetTypeEnum';

export type AssetList = {
    readonly id: number;
    name: string;
    type: AssetTypeEnum;
    green_house_gas_class_notation?: string;
    design_description: string;
    draft: boolean;
};
