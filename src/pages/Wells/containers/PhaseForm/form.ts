import {
  CreateWellStep,
  UpdateWellStep,
  WellPlannerDetailsPlannedStep,
  AssetSeasonEnum,
  WellPlannerDetailsCompleteStep,
  MaterialCategoryEnum,
} from 'api/schema';
import { CO2 } from 'consts/format';

export type MaterialFormValues = {
  id: number | null;
  material_category: MaterialCategoryEnum | null;
  material_type: number | null;
  quantity: number | null;
  quota: boolean;
};

export type FormValues = {
  phase: number | null;
  duration: number | null;
  mode: number | null;
  season: AssetSeasonEnum | null;
  carbon_capture_storage_system_quantity?: number | null;
  emission_reduction_initiatives: number[];
  well_section_length: number | null;
  waiting_on_weather: number | null;
  comment: string;
  external_energy_supply_enabled: boolean;
  external_energy_supply_quota: boolean;
  materials: MaterialFormValues[];
};

export const normalizeFormValues = (
  values: FormValues,
): CreateWellStep | UpdateWellStep => {
  return {
    phase: Number(values.phase),
    duration: Number(values.duration),
    mode: Number(values.mode),
    season: values.season as AssetSeasonEnum,
    carbon_capture_storage_system_quantity:
      values.carbon_capture_storage_system_quantity,
    emission_reduction_initiatives: values.emission_reduction_initiatives,
    well_section_length: Number(values.well_section_length),
    waiting_on_weather: Number(values.waiting_on_weather),
    external_energy_supply_enabled: values.external_energy_supply_enabled,
    external_energy_supply_quota: values.external_energy_supply_quota,
    comment: values.comment,
    materials: values.materials.map((material) => ({
      material_category: material.material_category as MaterialCategoryEnum,
      material_type: Number(material.material_type),
      quantity: Number(material.quantity),
      quota: material.quota,
    })),
  };
};

export const getInitialValues = (
  step?: WellPlannerDetailsPlannedStep | WellPlannerDetailsCompleteStep,
): FormValues => {
  if (!step) {
    return {
      phase: null,
      duration: null,
      mode: null,
      season: null,
      carbon_capture_storage_system_quantity: null,
      emission_reduction_initiatives: [],
      well_section_length: null,
      waiting_on_weather: null,
      external_energy_supply_enabled: false,
      external_energy_supply_quota: false,
      comment: '',
      materials: [],
    };
  }

  const materials = step.materials.map((material) => ({
    id: material.id,
    material_category: material.material_type.category,
    material_type: material.material_type.id,
    quantity: material.quantity,
    quota: material.quota,
  }));

  return {
    phase: step.phase.id,
    duration: step.duration,
    mode: step.mode.id,
    season: step.season,
    carbon_capture_storage_system_quantity:
      step.carbon_capture_storage_system_quantity,
    emission_reduction_initiatives: step.emission_reduction_initiatives,
    well_section_length: step.well_section_length,
    waiting_on_weather: step.waiting_on_weather,
    external_energy_supply_enabled: step.external_energy_supply_enabled,
    external_energy_supply_quota: step.external_energy_supply_quota,
    comment: step.comment || '',
    materials,
  };
};

export const LABELS: Record<
  keyof Omit<FormValues, 'emission_reduction_initiatives' | 'materials'>,
  string
> = {
  phase: 'Phase',
  duration: 'Duration (days)',
  waiting_on_weather: 'Waiting on weather contingency for selected days (%)',
  mode: 'Rig mode',
  season: 'Season',
  carbon_capture_storage_system_quantity: `CC&S quantity (Ton ${CO2}/d)`,
  well_section_length: 'Well section length (m)',
  comment: 'Comment',
  external_energy_supply_enabled: 'External energy supply',
  external_energy_supply_quota: 'Quota obligation',
};

export const MATERIAL_LABELS: Record<
  keyof Omit<MaterialFormValues, 'id'>,
  string
> = {
  material_category: 'Material category',
  material_type: 'Material type',
  quantity: 'Quantity',
  quota: 'Quota obligation',
};
