/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type PrivacyPolicyConsent = {
    readonly id: number;
    title: string;
    text: string;
    revoked_at?: string | null;
    readonly created_at: string;
};
