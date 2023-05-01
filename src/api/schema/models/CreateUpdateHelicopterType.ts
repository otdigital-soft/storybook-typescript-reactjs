/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateUpdateHelicopterType = {
    type: string;
    /**
     * Fuel density (kg/m3)
     */
    fuel_density: number;
    /**
     * Ton CO2/m3 fuel
     */
    co2_per_fuel: number;
    /**
     * kg NOx/m3 fuel
     */
    nox_per_fuel: number;
    /**
     * Fuel consumption (Litres/h)
     */
    fuel_consumption: number;
    /**
     * Fuel cost (USD/m3)
     */
    fuel_cost: number;
    /**
     * CO2 tax (USD/m3)
     */
    co2_tax: number;
    /**
     * NOx tax (USD/m3)
     */
    nox_tax: number;
};
