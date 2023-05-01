import {
  AssetTypeEnum,
  EmissionReductionInitiativeTypeEnum,
  MaterialCategoryEnum,
} from 'api/schema';

export const ASSET_TYPE_NAME_MAP: Record<AssetTypeEnum, string> = {
  [AssetTypeEnum.DRILLSHIP]: 'Drillship',
  [AssetTypeEnum.JACKUP]: 'Jackup',
  [AssetTypeEnum.SEMI]: 'Semi-submersible',
  [AssetTypeEnum.FIXED_PLATFORM]: 'Fixed platform',
};

export const MATERIAL_CATEGORY_NAME_MAP: Record<MaterialCategoryEnum, string> =
  {
    [MaterialCategoryEnum.CEMENT]: 'Cement',
    [MaterialCategoryEnum.STEEL]: 'Steel',
    [MaterialCategoryEnum.BULK]: 'Bulk',
    [MaterialCategoryEnum.CHEMICALS]: 'Chemicals',
  };

export const EMISSION_REDUCTION_INITIATIVE_TYPE_NAME_MAP: Record<
  EmissionReductionInitiativeTypeEnum,
  string
> = {
  [EmissionReductionInitiativeTypeEnum.BASELOADS]: 'Base loads',
  [EmissionReductionInitiativeTypeEnum.POWER_SYSTEMS]: 'Power systems',
  [EmissionReductionInitiativeTypeEnum.PRODUCTIVITY]: 'Productivity',
};
