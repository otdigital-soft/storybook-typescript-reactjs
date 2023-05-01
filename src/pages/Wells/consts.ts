import { WellPlannerWellTypeEnum } from 'api/schema';

export const WELL_TYPE_NAME_MAP: Record<WellPlannerWellTypeEnum, string> = {
  [WellPlannerWellTypeEnum.EXPLORATION]: 'Exploration',
  [WellPlannerWellTypeEnum.PRODUCTION]: 'Production',
  [WellPlannerWellTypeEnum.APPRAISAL]: 'Appraisal',
};
