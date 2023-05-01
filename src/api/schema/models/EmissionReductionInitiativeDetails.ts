/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmissionReductionInitiativeDetailInput } from './EmissionReductionInitiativeDetailInput';
import type { EmissionReductionInitiativeTypeEnum } from './EmissionReductionInitiativeTypeEnum';

export type EmissionReductionInitiativeDetails = {
    readonly id: number;
    name: string;
    type: EmissionReductionInitiativeTypeEnum;
    description: string;
    vendor: string;
    deployment_date: string;
    inputs: Array<EmissionReductionInitiativeDetailInput>;
    readonly transit: number;
};
