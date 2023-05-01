/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type AssetExternalEnergySupply = {
    /**
     * External energy supply type
     */
    type: string;
    /**
     * Capacity (MWh/day)
     */
    capacity: number;
    /**
     * Ton CO2/MWh
     */
    co2: number;
    /**
     * Kg NOx / MWh
     */
    nox: number;
    /**
     * Generator efficiency factor (MWh/m3 fuel)
     */
    generator_efficiency_factor: number;
};
