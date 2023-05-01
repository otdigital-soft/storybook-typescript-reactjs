/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type CreateUpdateProject = {
    name: string;
    description: string;
    /**
     * Tugs day rate (USD)
     */
    tugs_day_rate: number;
    /**
     * Average Tug move fuel consumption (t/d)
     */
    tugs_avg_move_fuel_consumption: number;
    /**
     * Average Tug transit fuel consumption (t/d)
     */
    tugs_avg_transit_fuel_consumption: number;
    /**
     * Tug move speed (kn)
     */
    tugs_move_speed: number;
    /**
     * Tug transit speed (kn)
     */
    tugs_transit_speed: number;
    /**
     * Number of AHVs to be used
     */
    ahv_no_used: number;
    /**
     * Number of AHV days per location
     */
    ahv_no_days_per_location: number;
    /**
     * Average AHV fuel consumption (t/d)
     */
    ahv_avg_fuel_consumption: number;
    /**
     * AHV day rate (USD)
     */
    ahv_day_rate: number;
    /**
     * PSV calls per week
     */
    psv_calls_per_week: number;
    /**
     * Type of PSV's / names
     */
    psv_types: string;
    /**
     * PSV day rate (USD)
     */
    psv_day_rate: number;
    /**
     * Average PSV fuel transit consumption (t/d)
     */
    psv_avg_fuel_transit_consumption: number;
    /**
     * Average PSV fuel DP consumption (t/d)
     */
    psv_avg_fuel_dp_consumption: number;
    /**
     * PSV speed (kn)
     */
    psv_speed: number;
    /**
     * PSV loading time (d)
     */
    psv_loading_time: number;
    /**
     * PSV fuel price (USD/t)
     */
    psv_fuel_price: number;
    /**
     * Helicopter number of flights per week
     */
    helicopter_no_flights_per_week: number;
    /**
     * Type of helicopters
     */
    helicopter_types: string;
    /**
     * Helicopter average fuel consumption (t/d)
     */
    helicopter_avg_fuel_consumption: number;
    /**
     * Helicopter rate per trip (USD)
     */
    helicopter_rate_per_trip: number;
    /**
     * Helicopter fuel price (USD/t)
     */
    helicopter_fuel_price: number;
    /**
     * Cruise speed (kn)
     */
    helicopter_cruise_speed: number;
    /**
     * Marine Diesel oil price
     */
    marine_diesel_oil_price: number;
    /**
     * CO2 tax (USD/t)
     */
    co2_tax: number;
    /**
     * NOX tax (USD/t)
     */
    nox_tax: number;
    /**
     * Total fuel price (USD/t)
     */
    fuel_total_price: number;
    /**
     * Fuel density (t/m3)
     */
    fuel_density: number;
    /**
     * CO2 emission per tonne fuel
     */
    co2_emission_per_tonne_fuel: number;
    /**
     * CO2 emission per m3 fuel
     */
    co2_emission_per_m3_fuel: number;
};
