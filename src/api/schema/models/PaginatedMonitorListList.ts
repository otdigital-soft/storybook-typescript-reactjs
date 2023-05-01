/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { MonitorList } from './MonitorList';

export type PaginatedMonitorListList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<MonitorList>;
};
