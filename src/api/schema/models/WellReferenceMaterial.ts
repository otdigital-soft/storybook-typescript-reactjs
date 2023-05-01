/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type WellReferenceMaterial = {
    readonly id: number;
    /**
     * Well details material
     */
    details?: string;
    /**
     * Vessels & helicopters material
     */
    vehicles?: string;
    /**
     * Well planning material
     */
    planning?: string;
    /**
     * Well complete material
     */
    complete?: string;
};
