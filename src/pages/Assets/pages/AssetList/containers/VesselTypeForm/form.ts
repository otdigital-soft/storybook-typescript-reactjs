import { CreateUpdateVesselType, VesselTypeList } from 'api/schema';
import { CO2, CUBIC_METRE } from 'consts/format';

export type FormValues = {
  type: string;
  fuel_type: string;
  fuel_density: number | null;
  fuel_consumption_summer: number | null;
  fuel_consumption_winter: number | null;
  co2_per_fuel: number | null;
  nox_per_fuel: number | null;
  co2_tax: number | null;
  nox_tax: number | null;
  fuel_cost: number | null;
};

export const LABELS: Record<keyof FormValues | 'total_fuel_cost', string> = {
  type: 'Vessel type',
  fuel_type: 'Fuel type',
  fuel_density: `Fuel density (kg/${CUBIC_METRE})`,
  fuel_consumption_summer: `Fuel consumption summer (${CUBIC_METRE}/day)`,
  fuel_consumption_winter: `Fuel consumption winter (${CUBIC_METRE}/day)`,
  co2_per_fuel: `Ton ${CO2}/${CUBIC_METRE} fuel`,
  nox_per_fuel: 'Kg NOx/Ton Fuel',
  co2_tax: `${CO2} tax (USD/${CUBIC_METRE})`,
  nox_tax: `NOx tax (USD/${CUBIC_METRE})`,
  fuel_cost: `Fuel cost (USD/${CUBIC_METRE})`,
  total_fuel_cost: 'Total fuel cost',
};

export const getInitialValues = (vesselType?: VesselTypeList): FormValues => ({
  type: vesselType?.type || '',
  fuel_type: vesselType?.fuel_type || '',
  fuel_density: vesselType?.fuel_density ?? null,
  fuel_consumption_summer: vesselType?.fuel_consumption_summer ?? null,
  fuel_consumption_winter: vesselType?.fuel_consumption_winter ?? null,
  co2_per_fuel: vesselType?.co2_per_fuel ?? null,
  nox_per_fuel: vesselType?.nox_per_fuel ?? null,
  co2_tax: vesselType?.co2_tax ?? null,
  nox_tax: vesselType?.nox_tax ?? null,
  fuel_cost: vesselType?.fuel_cost ?? null,
});

export const normalizeFormValues = (
  values: FormValues,
): CreateUpdateVesselType => ({
  type: values.type,
  fuel_type: values.fuel_type,
  fuel_density: Number(values.fuel_density),
  fuel_consumption_summer: Number(values.fuel_consumption_summer),
  fuel_consumption_winter: Number(values.fuel_consumption_winter),
  co2_per_fuel: Number(values.co2_per_fuel),
  nox_per_fuel: Number(values.nox_per_fuel),
  co2_tax: Number(values.co2_tax),
  nox_tax: Number(values.nox_tax),
  fuel_cost: Number(values.fuel_cost),
});
