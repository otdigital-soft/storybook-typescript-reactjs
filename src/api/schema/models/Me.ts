/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Company } from './Company';
import type { PhoneNumber } from './PhoneNumber';
import type { RoleEnum } from './RoleEnum';

export type Me = {
    readonly id: number;
    first_name?: string;
    last_name?: string;
    role: RoleEnum;
    readonly company: Company;
    company_name?: string;
    readonly phone_number: PhoneNumber | null;
    email: string;
    profile_image: string;
    readonly privacy_policy_consent_valid: boolean;
};
