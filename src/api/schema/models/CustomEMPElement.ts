/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ConceptEMPElement } from './ConceptEMPElement';

export type CustomEMPElement = {
    readonly id: number;
    concept: ConceptEMPElement;
    baseline_average: number;
    target_average: number;
};
