/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WellPlannerWellTypeEnum } from './WellPlannerWellTypeEnum';

export type CreateUpdateWell = {
    name: number;
    sidetrack: string;
    description?: string;
    field: string;
    location: string;
    type: WellPlannerWellTypeEnum;
    asset: number;
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
};
