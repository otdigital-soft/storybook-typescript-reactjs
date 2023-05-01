/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MaterialCategoryEnum } from './MaterialCategoryEnum';

export type AllMaterialTypeList = {
    readonly id: number;
    type: string;
    category: MaterialCategoryEnum;
    unit: string;
};
