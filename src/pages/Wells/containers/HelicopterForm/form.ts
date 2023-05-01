import {
  CompleteHelicopterUseList,
  CreateUpdateCompleteHelicopterUse,
  CreateUpdatePlannedHelicopterUse,
  PlannedHelicopterUseList,
} from 'api/schema';

export type FormValues = {
  helicopter_type: number | null;
  trips: number | null;
  trip_duration: number | null;
  exposure_against_current_well: number | null;
  quota_obligation: number | null;
};

export const LABELS: Record<keyof FormValues, string> = {
  helicopter_type: 'Type',
  trips: 'Number of round trips',
  trip_duration: 'Flight time per round trip (minutes)',
  exposure_against_current_well: 'Percentage exposure against current well',
  quota_obligation: 'Percentage quota obligation',
};

export const getInitialValues = (
  helicopterUse?: PlannedHelicopterUseList | CompleteHelicopterUseList,
): FormValues => {
  if (!helicopterUse) {
    return {
      helicopter_type: null,
      trips: null,
      trip_duration: null,
      exposure_against_current_well: null,
      quota_obligation: null,
    };
  }
  return {
    helicopter_type: helicopterUse.helicopter_type.id,
    trips: helicopterUse.trips,
    trip_duration: helicopterUse.trip_duration,
    exposure_against_current_well: helicopterUse.exposure_against_current_well,
    quota_obligation: helicopterUse.quota_obligation,
  };
};

export const normalizeFormValues = (
  values: FormValues,
): CreateUpdatePlannedHelicopterUse & CreateUpdateCompleteHelicopterUse => ({
  helicopter_type: Number(values.helicopter_type),
  trips: Number(values.trips),
  trip_duration: Number(values.trip_duration),
  exposure_against_current_well: Number(values.exposure_against_current_well),
  quota_obligation: Number(values.quota_obligation),
});
