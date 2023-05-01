/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CompleteHelicopterUseList } from './CompleteHelicopterUseList';
import type { CompleteVesselUseList } from './CompleteVesselUseList';
import type { CurrentStepEnum } from './CurrentStepEnum';
import type { PlannedHelicopterUseList } from './PlannedHelicopterUseList';
import type { PlannedVesselUseList } from './PlannedVesselUseList';
import type { WellName } from './WellName';
import type { WellPlannerAsset } from './WellPlannerAsset';
import type { WellPlannerDetailsCompleteStep } from './WellPlannerDetailsCompleteStep';
import type { WellPlannerDetailsPlannedStep } from './WellPlannerDetailsPlannedStep';
import type { WellPlannerWellTypeEnum } from './WellPlannerWellTypeEnum';

export type WellPlannerDetails = {
    readonly id: number;
    name: WellName;
    sidetrack: string;
    description?: string;
    field: string;
    location: string;
    type: WellPlannerWellTypeEnum;
    asset: WellPlannerAsset;
    /**
     * Asset fuel type
     */
    fuel_type: string;
    /**
     * Fuel density (kg/m3)
     */
    fuel_density: number;
    /**
     * Ton CO2/m3 fuel
     */
    co2_per_fuel: number;
    /**
     * Kg NOx/Ton fuel
     */
    nox_per_fuel: number;
    /**
     * CO2 tax (USD/m3)
     */
    co2_tax: number;
    /**
     * NOx tax (USD/m3)
     */
    nox_tax: number;
    /**
     * Fuel cost (USD/m3)
     */
    fuel_cost: number;
    /**
     * Ton CO2/m3 fuel for boilers
     */
    boilers_co2_per_fuel: number;
    /**
     * Kg NOx/Ton fuel for boilers
     */
    boilers_nox_per_fuel: number;
    planned_start_date: string;
    actual_start_date?: string | null;
    current_step: CurrentStepEnum;
    planned_vessel_uses: Array<PlannedVesselUseList>;
    complete_vessel_uses: Array<CompleteVesselUseList>;
    planned_helicopter_uses: Array<PlannedHelicopterUseList>;
    complete_helicopter_uses: Array<CompleteHelicopterUseList>;
    planned_steps: Array<WellPlannerDetailsPlannedStep>;
    complete_steps: Array<WellPlannerDetailsCompleteStep>;
};
