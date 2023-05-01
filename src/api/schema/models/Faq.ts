/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FaqElement } from './FaqElement';

export type Faq = {
    readonly id: number;
    /**
     * Title of the FAQ section
     */
    title: string;
    elements: Array<FaqElement>;
};
