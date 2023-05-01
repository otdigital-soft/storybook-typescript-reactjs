import { CO2, CUBIC_METRE } from 'consts/format';
import { DefaultOptionType } from 'rc-select/lib/Select';
import { WellPlannerWellTypeEnum } from 'api/schema/models/WellPlannerWellTypeEnum';
import { WELL_TYPE_NAME_MAP } from 'pages/Wells/consts';
import { WellPlannerDetails } from 'api/schema';

export type FormValues = {
  name: number | null;
  sidetrack: string;
  description: string;
  field: string;
  location: string;
  type: string | null;
  asset: number | null;
  fuel_type: string;
  fuel_density: number | null;
  co2_per_fuel: number | null;
  nox_per_fuel: number | null;
  co2_tax: number | null;
  nox_tax: number | null;
  fuel_cost: number | null;
  boilers_co2_per_fuel: number | null;
  boilers_nox_per_fuel: number | null;
};

export const LABELS: Record<keyof FormValues | 'total_fuel_cost', string> = {
  name: 'Well name',
  sidetrack: 'Well sidetrack',
  description: 'Description',
  field: 'Field',
  location: 'Well location',
  type: 'Type of well',
  asset: 'Asset',
  fuel_type: 'Asset fuel type',
  fuel_density: `Fuel density (kg/${CUBIC_METRE})`,
  co2_per_fuel: `Ton ${CO2}/${CUBIC_METRE} fuel`,
  nox_per_fuel: `kg NOx/Ton fuel`,
  co2_tax: `${CO2} tax (USD/${CUBIC_METRE})`,
  nox_tax: `NOx tax (USD/${CUBIC_METRE})`,
  fuel_cost: `Fuel cost (USD/${CUBIC_METRE})`,
  total_fuel_cost: `Total fuel cost (USD/${CUBIC_METRE})`,
  boilers_co2_per_fuel: `Ton ${CO2}/${CUBIC_METRE} fuel`,
  boilers_nox_per_fuel: `kg NOx/Ton fuel`,
};

export const WELL_TYPE_OPTIONS: DefaultOptionType[] = Object.keys(
  WELL_TYPE_NAME_MAP,
).map((type) => ({
  value: type,
  label: WELL_TYPE_NAME_MAP[type as WellPlannerWellTypeEnum],
}));

export const getInitialValues = (well?: WellPlannerDetails): FormValues => {
  if (well) {
    return {
      name: well.name.id,
      sidetrack: well.sidetrack,
      description: well.description || '',
      field: well.field,
      location: well.location,
      type: well.type,
      asset: well.asset.id,
      fuel_type: well.fuel_type,
      fuel_density: well.fuel_density,
      co2_per_fuel: well.co2_per_fuel,
      nox_per_fuel: well.nox_per_fuel,
      co2_tax: well.co2_tax,
      nox_tax: well.nox_tax,
      fuel_cost: well.fuel_cost,
      boilers_co2_per_fuel: well.boilers_co2_per_fuel,
      boilers_nox_per_fuel: well.boilers_nox_per_fuel,
    };
  }
  return {
    name: null,
    sidetrack: '',
    description: '',
    field: '',
    location: '',
    type: null,
    asset: null,
    fuel_type: '',
    fuel_density: null,
    co2_per_fuel: null,
    nox_per_fuel: null,
    co2_tax: null,
    nox_tax: null,
    fuel_cost: null,
    boilers_co2_per_fuel: null,
    boilers_nox_per_fuel: null,
  };
};
