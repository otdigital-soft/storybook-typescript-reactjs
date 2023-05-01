/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StudyElementRig } from './StudyElementRig';
import type { StudyMetric } from './StudyMetric';

export type StudyElement = {
    readonly id: number;
    title: string;
    metric: StudyMetric;
    plan: number;
    project: number;
    readonly rigs: Array<StudyElementRig>;
    readonly order: number;
};
