import { WellPlannerCO2Dataset } from 'api/schema';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellPlannedPlanCO2 from 'pages/WellPlan/hooks/useWellPlannedPlanCO2';
import { useMemo } from 'react';
import useWellCompletePlanCO2 from './useWellCompletePlanCO2';
import useWellMeasuredAirTemperature from './useWellMeasuredAirTemperature';
import useWellMeasuredWaveHeave from './useWellMeasuredWaveHeave';
import useWellMeasuredWindSpeed from './useWellMeasuredWindSpeed';

export enum PlanType {
  Planned = 'Planned',
  Complete = 'Complete',
}

export type CommonCO2Data = WellPlannerCO2Dataset & {
  phaseId: `${PlanType}/${number}/${number}`;
  plan: PlanType;
};

const useWellCompletePlanCommonCO2Data = ({
  start,
  end,
}: {
  start?: Date;
  end?: Date;
} = {}) => {
  const { wellPlanId } = useCurrentWellPlan();
  const {
    data: wellCompletePlanCO2Data,
    isLoading: isLoadingWellCompletePlanCO2,
    isRefetching: isRefetchingWellCompletePlanCO2,
    error: wellCompletePlanCO2Error,
  } = useWellCompletePlanCO2({
    wellPlanId,
    start,
    end,
  });
  const {
    data: wellPlannedPlanCO2Data,
    isLoading: isLoadingWellPlannedPlanCO2,
    isRefetching: isRefetchingWellPlannedPlanCO2,
    error: wellPlannedPlanCO2Error,
  } = useWellPlannedPlanCO2({
    wellPlanId,
    start,
    end,
  });
  const plannedPlanCO2Data: CommonCO2Data[] = useMemo(
    () =>
      wellPlannedPlanCO2Data?.map((data) => ({
        ...data,
        phaseId: `${PlanType.Planned}/${data.phase.id}/${data.step.id}`,
        plan: PlanType.Planned,
      })) || [],
    [wellPlannedPlanCO2Data],
  );
  const completePlanCO2Data: CommonCO2Data[] = useMemo(
    () =>
      wellCompletePlanCO2Data?.map((data) => ({
        ...data,
        phaseId: `${PlanType.Complete}/${data.phase.id}/${data.step.id}`,
        plan: PlanType.Complete,
      })) || [],
    [wellCompletePlanCO2Data],
  );
  const commonPlanCO2Data = useMemo(
    () => plannedPlanCO2Data.concat(completePlanCO2Data),
    [completePlanCO2Data, plannedPlanCO2Data],
  );
  const commonDays = useMemo(
    () => [...new Set(commonPlanCO2Data.map((data) => data.date))],
    [commonPlanCO2Data],
  );
  const {
    data: windSpeedData,
    isLoading: isLoadingWindSpeed,
    isRefetching: isRefetchingWindSpeed,
    error: windSpeedError,
  } = useWellMeasuredWindSpeed({
    wellPlanId,
    start,
    end,
  });
  const {
    data: temperatureData,
    isLoading: isLoadingTemperature,
    isRefetching: isRefetchingTemperature,
    error: temperatureError,
  } = useWellMeasuredAirTemperature({
    wellPlanId,
    start,
    end,
  });
  const {
    data: waveHeaveData,
    isLoading: isLoadingWaveHeave,
    isRefetching: isRefetchingWaveHeave,
    error: waveHeaveError,
  } = useWellMeasuredWaveHeave({
    wellPlanId,
    start,
    end,
  });

  return {
    isLoading:
      isLoadingWellCompletePlanCO2 ||
      isLoadingWellPlannedPlanCO2 ||
      isLoadingWaveHeave ||
      isLoadingWindSpeed ||
      isLoadingTemperature,
    isRefetching:
      isRefetchingWellCompletePlanCO2 ||
      isRefetchingWellPlannedPlanCO2 ||
      isRefetchingWaveHeave ||
      isRefetchingWindSpeed ||
      isRefetchingTemperature,
    error:
      wellCompletePlanCO2Error ||
      wellPlannedPlanCO2Error ||
      windSpeedError ||
      temperatureError ||
      waveHeaveError,
    plannedPlanCO2Data,
    completePlanCO2Data,
    wellCompletePlanCO2Data,
    wellPlannedPlanCO2Data,
    commonPlanCO2Data,
    commonDays,
    waveHeaveData,
    temperatureData,
    windSpeedData,
  };
};

export default useWellCompletePlanCommonCO2Data;
