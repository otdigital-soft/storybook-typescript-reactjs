import { DefaultOptionType } from 'antd/lib/cascader';
import {
  CreateMaterialType,
  MaterialCategoryEnum,
  MaterialTypeList,
} from 'api/schema';
import { CO2 } from 'consts/format';
import { MATERIAL_CATEGORY_NAME_MAP } from 'pages/Assets/consts';

export type FormValues = {
  category: MaterialCategoryEnum | null;
  type: string;
  unit: string;
  co2: number | null;
};

export const LABELS: Record<keyof FormValues, string> = {
  category: 'Material category',
  type: 'Material type',
  unit: 'Unit',
  co2: `${CO2} Emission (Ton/unit)`,
};

export const getInitialValues = (
  materialType?: MaterialTypeList,
): FormValues => ({
  category: materialType?.category || null,
  type: materialType?.type || '',
  unit: materialType?.unit || '',
  co2: materialType?.co2 ?? null,
});

export const normalizeFormValues = (
  values: FormValues,
): CreateMaterialType => ({
  category: values.category as MaterialCategoryEnum,
  type: values.type,
  unit: values.unit,
  co2: Number(values.co2),
});

export const MATERIAL_CATEGORY_OPTIONS: DefaultOptionType[] = [
  MaterialCategoryEnum.BULK,
  MaterialCategoryEnum.CEMENT,
  MaterialCategoryEnum.CHEMICALS,
  MaterialCategoryEnum.STEEL,
].map((category) => ({
  value: category,
  label: MATERIAL_CATEGORY_NAME_MAP[category],
}));
