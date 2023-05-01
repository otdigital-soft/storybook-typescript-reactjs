/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MonitorElementDetails } from './MonitorElementDetails';

export type MonitorDetails = {
    readonly id: number;
    name: string;
    start_date: string;
    end_date: string;
    elements: Array<MonitorElementDetails>;
};
