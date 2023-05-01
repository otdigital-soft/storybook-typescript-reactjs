/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VesselTypeList = {
    readonly id: number;
    type: string;
    fuel_type: string;
    /**
     * Fuel density (kg/m3)
     */
    fuel_density: number;
    /**
     * Fuel consumption summer (m3/day)
     */
    fuel_consumption_summer: number;
    /**
     * Fuel consumption winter (m3/day)
     */
    fuel_consumption_winter: number;
    /**
     * Ton CO2/m3 fuel
     */
    co2_per_fuel: number;
    /**
     * Kg NOx/Ton Fuel
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
};
