/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WellPlannerCO2EmissionReductionInitiative } from './WellPlannerCO2EmissionReductionInitiative';

export type WellPlannerPlannedStepCO2 = {
    baseline: number;
    target: number;
    rig: number;
    vessels: number;
    helicopters: number;
    external_energy_supply: number;
    cement: number;
    steel: number;
    emission_reduction_initiatives: Array<WellPlannerCO2EmissionReductionInitiative>;
};
