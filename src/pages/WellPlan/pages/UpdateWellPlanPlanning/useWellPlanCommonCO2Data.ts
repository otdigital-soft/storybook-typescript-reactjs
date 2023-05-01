import { WellPlannerCO2Dataset, WellPlannerCO2SavedDataset } from 'api/schema';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellPlannedPlanCO2 from 'pages/WellPlan/hooks/useWellPlannedPlanCO2';
import useWellPlannedPlanSavedCO2 from 'pages/WellPlan/hooks/useWellPlannedPlanSavedCO2';
import useWellPlannerEmissionReductionInitiatives from 'pages/WellPlan/hooks/useWellPlannerEmissionReductionInitiatives';
import { aggregateDatasetByDate } from 'pages/WellPlan/utils/chart';
import { useMemo } from 'react';

export enum SavedCO2PhaseEnum {
  SAVED_TIME = 'SAVED_TIME',
}

export type PhaseId = `${number}/${number}` | SavedCO2PhaseEnum;

export type CommonCO2Data =
  | (WellPlannerCO2Dataset & {
      phaseId: PhaseId;
    })
  | (WellPlannerCO2SavedDataset & {
      phase: {
        name: string;
      };
      phaseId: PhaseId;
      mode: undefined;
    });

const useWellPlanCommonCO2Data = ({
  start,
  end,
}: {
  start?: Date;
  end?: Date;
} = {}) => {
  const { wellPlanId } = useCurrentWellPlan();
  const {
    data: wellPlannedPlanCO2Data,
    isLoading: isLoadingWellPlannedPlanCO2,
    isRefetching: isRefetchingWellPlannedPlanCO2,
  } = useWellPlannedPlanCO2({
    wellPlanId,
    start,
    end,
  });
  const {
    data: wellPlannedPlanSavedCO2Data,
    isLoading: isLoadingWellPlannedPlanSavedCO2,
    isRefetching: isRefetchingWellPlannedPlanSavedCO2,
  } = useWellPlannedPlanSavedCO2({
    wellPlanId,
    start,
    end,
  });
  const commonWellPlannedPlanCO2Data: CommonCO2Data[] = useMemo(
    () =>
      wellPlannedPlanCO2Data?.map((co2) => {
        return {
          ...co2,
          phaseId: `${co2.phase.id}/${co2.step.id}`,
        };
      }) || [],
    [wellPlannedPlanCO2Data],
  );
  const dailyWellPlannedPlanCO2Data = useMemo(
    () => aggregateDatasetByDate(wellPlannedPlanCO2Data || []),
    [wellPlannedPlanCO2Data],
  );
  const commonWellPlannedPlanSavedCO2Data: CommonCO2Data[] = useMemo(
    () =>
      wellPlannedPlanSavedCO2Data?.map((co2) => {
        return {
          ...co2,
          phase: {
            name: 'Saved Time',
          },
          mode: undefined,
          phaseId: SavedCO2PhaseEnum.SAVED_TIME,
        };
      }) || [],
    [wellPlannedPlanSavedCO2Data],
  );
  const commonCO2Data: CommonCO2Data[] = useMemo(
    () =>
      commonWellPlannedPlanCO2Data.concat(commonWellPlannedPlanSavedCO2Data),
    [commonWellPlannedPlanCO2Data, commonWellPlannedPlanSavedCO2Data],
  );
  const {
    data: emissionReductionInitiativesData,
    isLoading: isLoadingEmissionReductionInitiatives,
    isRefetching: isRefetchingEmissionReductionInitiatives,
  } = useWellPlannerEmissionReductionInitiatives(wellPlanId);

  return {
    dailyWellPlannedPlanCO2Data,
    commonWellPlannedPlanSavedCO2Data,
    commonCO2Data,
    emissionReductionInitiativesData,
    isLoading:
      isLoadingWellPlannedPlanCO2 ||
      isLoadingWellPlannedPlanSavedCO2 ||
      isLoadingEmissionReductionInitiatives,
    isRefetching:
      isRefetchingWellPlannedPlanCO2 ||
      isRefetchingWellPlannedPlanSavedCO2 ||
      isRefetchingEmissionReductionInitiatives,
  };
};

export default useWellPlanCommonCO2Data;
