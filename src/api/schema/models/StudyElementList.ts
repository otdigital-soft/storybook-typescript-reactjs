/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { StudyMetric } from './StudyMetric';

export type StudyElementList = {
    readonly id: number;
    title: string;
    metric: StudyMetric;
    plan: number;
    project: number;
    readonly order: number;
};
