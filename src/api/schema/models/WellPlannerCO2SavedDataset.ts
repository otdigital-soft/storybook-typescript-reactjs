/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WellPlannerCO2EmissionReductionInitiative } from './WellPlannerCO2EmissionReductionInitiative';

export type WellPlannerCO2SavedDataset = {
    date: string;
    rig: number;
    vessels: number;
    helicopters: number;
    external_energy_supply: number;
    cement: number;
    steel: number;
    emission_reduction_initiatives: Array<WellPlannerCO2EmissionReductionInitiative>;
};
