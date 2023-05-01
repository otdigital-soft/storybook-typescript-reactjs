/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ElementListTypeEnum } from './ElementListTypeEnum';

export type ElementList = {
    id: number;
    name: string;
    type: ElementListTypeEnum;
    created_at: string;
    updated_at: string;
    project: number;
};
