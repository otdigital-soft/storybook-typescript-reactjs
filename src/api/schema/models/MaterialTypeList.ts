/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MaterialCategoryEnum } from './MaterialCategoryEnum';

export type MaterialTypeList = {
    readonly id: number;
    type: string;
    category: MaterialCategoryEnum;
    unit: string;
    /**
     * Ton CO2/unit
     */
    co2: number;
};
