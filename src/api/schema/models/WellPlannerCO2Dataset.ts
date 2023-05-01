/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ID } from './ID';
import type { WellPlannerCO2EmissionReductionInitiative } from './WellPlannerCO2EmissionReductionInitiative';
import type { WellPlannerMode } from './WellPlannerMode';
import type { WellPlannerPhase } from './WellPlannerPhase';

export type WellPlannerCO2Dataset = {
    date: string;
    phase: WellPlannerPhase;
    mode: WellPlannerMode;
    step: ID;
    rig: number;
    vessels: number;
    helicopters: number;
    external_energy_supply: number;
    cement: number;
    steel: number;
    emission_reduction_initiatives: Array<WellPlannerCO2EmissionReductionInitiative>;
};
