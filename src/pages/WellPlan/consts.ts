import { CheckboxOptionType } from 'antd/lib/checkbox/Group';
import {
  AssetSeasonEnum,
  CurrentStepEnum,
  EmissionReductionInitiativeTypeEnum,
} from 'api/schema';

export enum WellPlanStep {
  Details = 'details',
  Planning = 'planning',
  Complete = 'complete',
  Analysis = 'analysis',
}

export const CurrentStepToWellPlanStepMap: Record<
  CurrentStepEnum,
  WellPlanStep
> = {
  [CurrentStepEnum.WELL_PLANNING]: WellPlanStep.Planning,
  [CurrentStepEnum.WELL_REVIEWING]: WellPlanStep.Complete,
  [CurrentStepEnum.WELL_REPORTING]: WellPlanStep.Analysis,
};

export const CO2_CHART_COLORS = {
  baseline: '#F4CCCF',
  target: '#667085',
  rig: '#EAECF0',
  vessels: '#7471C6',
  helicopters: '#827FCC',
  externalEnergySupply: '#9D9BD7',
  cement: '#B9B8E2',
  steel: '#D5D4EE',
  emp: '#DB6B74',
  measured: '#FF7A7F',
  cumulative: '#57687C',
  temperature: '#E8B618',
  windSpeed: '#88D3A6',
  waveHeight: '#6363AA',
};

export const SEASON_NAME_MAP: Record<AssetSeasonEnum, string> = {
  [AssetSeasonEnum.SUMMER]: 'Summer',
  [AssetSeasonEnum.WINTER]: 'Winter',
};

export const GENERATED_REPORT_EVENT_NAME = 'generatedReportEvent';

export const EMISSION_REDUCTION_INITIATIVE_TYPE_NAME_MAP: Record<
  EmissionReductionInitiativeTypeEnum,
  string
> = {
  [EmissionReductionInitiativeTypeEnum.POWER_SYSTEMS]: 'Power systems',
  [EmissionReductionInitiativeTypeEnum.BASELOADS]: 'Baseloads',
  [EmissionReductionInitiativeTypeEnum.PRODUCTIVITY]: 'Productivity',
};

export const EMISSION_REDUCTION_INITIATIVE_TYPE_ORDER_MAP: Record<
  EmissionReductionInitiativeTypeEnum,
  number
> = {
  [EmissionReductionInitiativeTypeEnum.POWER_SYSTEMS]: 1,
  [EmissionReductionInitiativeTypeEnum.BASELOADS]: 2,
  [EmissionReductionInitiativeTypeEnum.PRODUCTIVITY]: 3,
};

export const SEASON_OPTIONS: CheckboxOptionType[] = Object.keys(
  AssetSeasonEnum,
).map((season) => ({
  value: season,
  label: SEASON_NAME_MAP[season as AssetSeasonEnum],
}));
