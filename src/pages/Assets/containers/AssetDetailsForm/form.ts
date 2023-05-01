import { ASSET_TYPE_NAME_MAP } from 'pages/Assets/consts';
import { DefaultOptionType } from 'rc-select/lib/Select';
import { AssetTypeEnum } from 'api/schema';
import { CO2, CUBIC_METRE } from 'consts/format';

type ExternalEnergySupplyFormValues = {
  type: string;
  capacity: number | null;
  co2: number | null;
  nox: number | null;
  generator_efficiency_factor: number | null;
};

export type FormValues = {
  name: string;
  type: AssetTypeEnum | null;
  green_house_gas_class_notation: string;
  design_description: string;
  draft: number;
  external_energy_supply: ExternalEnergySupplyFormValues;
};

export const LABELS: Record<
  keyof Omit<FormValues, 'external_energy_supply'>,
  string
> & {
  external_energy_supply: Record<keyof ExternalEnergySupplyFormValues, string>;
} = {
  name: 'Asset Name',
  type: 'Type',
  green_house_gas_class_notation: 'Green house gas class notation',
  design_description: 'Design description',
  draft: 'Status',
  external_energy_supply: {
    type: 'External energy supply type',
    capacity: 'Capacity (MWh/Day)',
    co2: `Ton ${CO2}/MWh`,
    nox: 'Kg NOx/MWh',
    generator_efficiency_factor: `Generator efficiency factor (MWh/${CUBIC_METRE} fuel)`,
  },
};

export const ASSET_TYPE_OPTIONS: DefaultOptionType[] = [
  AssetTypeEnum.JACKUP,
  AssetTypeEnum.FIXED_PLATFORM,
  AssetTypeEnum.SEMI,
  AssetTypeEnum.DRILLSHIP,
].map((type) => ({
  value: type,
  label: ASSET_TYPE_NAME_MAP[type],
}));
