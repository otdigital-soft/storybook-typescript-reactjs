import {
  PlannedVesselUseList,
  AssetSeasonEnum,
  CreateUpdatePlannedVesselUse,
  CreateUpdateCompleteVesselUse,
} from 'api/schema';

export type FormValues = {
  vessel_type: number | null;
  duration: number | null;
  exposure_against_current_well: number | null;
  waiting_on_weather: number | null;
  season: string | null;
  quota_obligation: number | null;
};

export const LABELS: Record<keyof FormValues, string> = {
  vessel_type: 'Type',
  duration: 'Duration (days)',
  exposure_against_current_well: 'Percentage exposure against current well',
  waiting_on_weather: 'Waiting on weather contingency (%)',
  season: 'Season',
  quota_obligation: 'Percentage quota obligation',
};

export const getInitialValues = (
  vesselUse?: PlannedVesselUseList,
): FormValues => {
  if (!vesselUse) {
    return {
      vessel_type: null,
      duration: null,
      exposure_against_current_well: null,
      waiting_on_weather: null,
      season: null,
      quota_obligation: null,
    };
  }

  return {
    vessel_type: vesselUse.vessel_type.id,
    duration: vesselUse.duration,
    exposure_against_current_well: vesselUse.exposure_against_current_well,
    waiting_on_weather: vesselUse.waiting_on_weather,
    season: vesselUse.season,
    quota_obligation: vesselUse.quota_obligation,
  };
};

export const normalizeFormValues = (
  values: FormValues,
): CreateUpdatePlannedVesselUse & CreateUpdateCompleteVesselUse => {
  return {
    vessel_type: Number(values.vessel_type),
    duration: Number(values.duration),
    exposure_against_current_well: Number(values.exposure_against_current_well),
    waiting_on_weather: Number(values.waiting_on_weather),
    season: values.season as AssetSeasonEnum,
    quota_obligation: Number(values.quota_obligation),
  };
};
