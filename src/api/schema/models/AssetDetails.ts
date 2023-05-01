/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AssetTypeEnum } from './AssetTypeEnum';
import type { Baseline } from './Baseline';
import type { EmissionManagementPlan } from './EmissionManagementPlan';
import type { ExternalEnergySupply } from './ExternalEnergySupply';

export type AssetDetails = {
    readonly id: number;
    name: string;
    type: AssetTypeEnum;
    green_house_gas_class_notation?: string;
    design_description: string;
    draft: boolean;
    baselines: Array<Baseline>;
    readonly emission_management_plans: Array<EmissionManagementPlan>;
    external_energy_supply: ExternalEnergySupply;
};
