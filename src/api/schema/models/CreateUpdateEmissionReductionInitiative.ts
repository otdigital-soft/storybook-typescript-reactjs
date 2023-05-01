/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateUpdateEmissionReductionInitiativeInput } from './CreateUpdateEmissionReductionInitiativeInput';
import type { EmissionReductionInitiativeTypeEnum } from './EmissionReductionInitiativeTypeEnum';

export type CreateUpdateEmissionReductionInitiative = {
    name: string;
    type: EmissionReductionInitiativeTypeEnum;
    description: string;
    vendor: string;
    deployment_date: string;
    inputs: Array<CreateUpdateEmissionReductionInitiativeInput>;
    transit: number;
};
