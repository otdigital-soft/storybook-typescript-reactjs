/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmissionReductionInitiativeTypeEnum } from './EmissionReductionInitiativeTypeEnum';

export type EmissionManagementPlanDetailsInitiative = {
    readonly id: number;
    name: string;
    description: string;
    type: EmissionReductionInitiativeTypeEnum;
    vendor: string;
    deployment_date: string;
};
