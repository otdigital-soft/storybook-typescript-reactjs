/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WellStepMaterialType } from './WellStepMaterialType';

export type WellStepMaterial = {
    readonly id: number;
    material_type: WellStepMaterialType;
    quantity: number;
    quota: boolean;
};
