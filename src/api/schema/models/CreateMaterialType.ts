/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MaterialCategoryEnum } from './MaterialCategoryEnum';

export type CreateMaterialType = {
    type: string;
    category: MaterialCategoryEnum;
    unit: string;
    /**
     * Ton CO2/unit
     */
    co2: number;
};
