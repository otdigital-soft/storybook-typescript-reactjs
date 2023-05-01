import { CreateUpdateHelicopterType, HelicopterTypeList } from 'api/schema';
import { CO2, CUBIC_METRE } from 'consts/format';

export type FormValues = {
  type: string;
  fuel_density: number | null;
  co2_per_fuel: number | null;
  nox_per_fuel: number | null;
  fuel_consumption: number | null;
  fuel_cost: number | null;
  co2_tax: number | null;
  nox_tax: number | null;
};

export const LABELS: Record<keyof FormValues | 'total_fuel_cost', string> = {
  type: 'Helicopter type',
  fuel_density: `Fuel density (kg/${CUBIC_METRE})`,
  co2_per_fuel: `Ton ${CO2}/${CUBIC_METRE} fuel`,
  nox_per_fuel: 'kg NOx/m3 fuel',
  fuel_consumption: `Fuel consumption (Litres/h)`,
  fuel_cost: `Fuel cost (USD/${CUBIC_METRE})`,
  co2_tax: `${CO2} tax (USD/${CUBIC_METRE})`,
  nox_tax: `NOx tax (USD/${CUBIC_METRE})`,
  total_fuel_cost: 'Total fuel cost',
};

export const getInitialValues = (
  helicopterType?: HelicopterTypeList,
): FormValues => ({
  type: helicopterType?.type || '',
  fuel_density: helicopterType?.fuel_density ?? null,
  co2_per_fuel: helicopterType?.co2_per_fuel ?? null,
  nox_per_fuel: helicopterType?.nox_per_fuel ?? null,
  fuel_consumption: helicopterType?.fuel_consumption ?? null,
  fuel_cost: helicopterType?.fuel_cost ?? null,
  co2_tax: helicopterType?.co2_tax ?? null,
  nox_tax: helicopterType?.nox_tax ?? null,
});

export const normalizeFormValues = (
  values: FormValues,
): CreateUpdateHelicopterType => ({
  type: values.type,
  fuel_density: Number(values.fuel_density),
  co2_per_fuel: Number(values.co2_per_fuel),
  nox_per_fuel: Number(values.nox_per_fuel),
  fuel_consumption: Number(values.fuel_consumption),
  fuel_cost: Number(values.fuel_cost),
  co2_tax: Number(values.co2_tax),
  nox_tax: Number(values.nox_tax),
});
