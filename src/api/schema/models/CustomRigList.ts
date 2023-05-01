/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CustomRigListEMP } from './CustomRigListEMP';
import type { CustomRigListProject } from './CustomRigListProject';
import type { RigTypeEnum } from './RigTypeEnum';

export type CustomRigList = {
    id: number;
    name: string;
    type: RigTypeEnum;
    created_at: string;
    updated_at: string;
    draft: boolean;
    readonly project: CustomRigListProject | null;
    readonly emp: CustomRigListEMP | null;
};
