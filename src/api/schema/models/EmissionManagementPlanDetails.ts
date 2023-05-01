/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EmissionManagementPlanDetailsInitiative } from './EmissionManagementPlanDetailsInitiative';

export type EmissionManagementPlanDetails = {
    readonly id: number;
    name: string;
    description: string;
    version: string;
    readonly updated_at: string;
    draft: boolean;
    initiatives: Array<EmissionManagementPlanDetailsInitiative>;
};
