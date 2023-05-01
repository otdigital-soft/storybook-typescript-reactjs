/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RigTypeEnum } from './RigTypeEnum';

export type StudyMetric = {
    readonly id: number;
    /**
     * Display name of the metric
     */
    name: string;
    unit?: string;
    /**
     * Rig CO2 plan attribute field name
     */
    key: string;
    readonly compatibility: Array<RigTypeEnum>;
};
