/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RigTypeEnum } from './RigTypeEnum';

export type StudyElementRig = {
    id: number;
    name: string;
    readonly type: RigTypeEnum;
    readonly value: number | null;
};
