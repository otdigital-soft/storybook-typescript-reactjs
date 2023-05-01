/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetExternalEnergySupply } from './AssetExternalEnergySupply';
import type { AssetTypeEnum } from './AssetTypeEnum';

export type UpdateAsset = {
    name: string;
    type: AssetTypeEnum;
    green_house_gas_class_notation?: string;
    design_description: string;
    draft: boolean;
    external_energy_supply: AssetExternalEnergySupply;
};
