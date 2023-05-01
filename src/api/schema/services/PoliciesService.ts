/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PrivacyPolicy } from '../models/PrivacyPolicy';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PoliciesService {

    /**
     * Policy details
     * @param policyId
     * @returns PrivacyPolicy
     * @throws ApiError
     */
    public static policiesRetrieve(
        policyId: number,
    ): CancelablePromise<PrivacyPolicy> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/policies/{policy_id}/',
            path: {
                'policy_id': policyId,
            },
        });
    }

    /**
     * Latest policy details
     * @returns PrivacyPolicy
     * @throws ApiError
     */
    public static policiesLatestRetrieve(): CancelablePromise<PrivacyPolicy> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/policies/latest/',
        });
    }

}