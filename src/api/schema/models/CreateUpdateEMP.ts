/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CreateUpdateCustomEMPElement } from './CreateUpdateCustomEMPElement';

export type CreateUpdateEMP = {
    name: string;
    description: string;
    api_description: string;
    start_date: string;
    end_date: string;
    total_rig_baseline_average: number;
    total_rig_target_average: number;
    elements: Array<CreateUpdateCustomEMPElement>;
};
