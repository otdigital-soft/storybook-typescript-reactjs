import { ChartDataset } from 'chart.js';
import Color from 'color';
import { CO2ChartData } from 'pages/WellPlan/components/CO2Chart';
import { CO2_CHART_COLORS } from 'pages/WellPlan/consts';
import useEmissionReductionInitiativesColors from 'pages/WellPlan/hooks/useEmissionReductionInitiativesColors';
import {
  calculateTarget,
  prepareBarDataset,
  prepareLineDataset,
} from 'pages/WellPlan/utils/chart';
import { useMemo } from 'react';
import { groupByKey, notEmpty } from 'utils/data';
import { CO2_CHART_LABELS } from './consts';
import useWellPlanCO2ChartFilters from './useWellPlanCO2ChartFilters';
import useWellPlanCommonCO2Data, {
  CommonCO2Data,
  SavedCO2PhaseEnum,
} from './useWellPlanCommonCO2Data';

const getBackgroundColor = (color: string) => (data: CommonCO2Data) => {
  return data.phaseId === SavedCO2PhaseEnum.SAVED_TIME
    ? Color(color).alpha(0.3).hexa()
    : color;
};

const useWellPlanCO2ChartData = ({
  start,
  end,
}: {
  start?: Date;
  end?: Date;
} = {}) => {
  const {
    dailyWellPlannedPlanCO2Data,
    commonCO2Data,
    emissionReductionInitiativesData,
    isLoading,
    isRefetching,
  } = useWellPlanCommonCO2Data({
    start,
    end,
  });
  const emissionReductionInitiativesColors =
    useEmissionReductionInitiativesColors();
  const labels = useMemo(
    () => [...new Set(commonCO2Data.map((data) => data.date))],
    [commonCO2Data],
  );
  const emptyData = useMemo(
    () =>
      labels.map((label) => ({
        x: label,
        y: null,
      })),
    [labels],
  );
  const [filters] = useWellPlanCO2ChartFilters();
  const groupedPhases = useMemo(
    () => groupByKey(commonCO2Data, 'phaseId'),
    [commonCO2Data],
  );
  const rigDatasets = useMemo(
    () =>
      prepareBarDataset({
        enabled: filters.rig,
        groupedPhases,
        label: CO2_CHART_LABELS.rig,
        emptyData,
        dataFunc: (data) => ({
          x: data.date,
          y: data.rig,
        }),
        backgroundColor: getBackgroundColor(CO2_CHART_COLORS.rig),
        order: 2,
      }),
    [emptyData, filters.rig, groupedPhases],
  );
  const vesselsDataset = useMemo(
    () =>
      prepareBarDataset({
        enabled: filters.vessels,
        groupedPhases,
        label: CO2_CHART_LABELS.vessels,
        emptyData,
        dataFunc: (data) => ({
          x: data.date,
          y: data.vessels,
        }),
        backgroundColor: getBackgroundColor(CO2_CHART_COLORS.vessels),
        order: 2,
      }),
    [emptyData, filters.vessels, groupedPhases],
  );
  const helicoptersDataset = useMemo(
    () =>
      prepareBarDataset({
        enabled: filters.helicopters,
        groupedPhases,
        label: CO2_CHART_LABELS.helicopters,
        emptyData,
        dataFunc: (data) => ({
          x: data.date,
          y: data.helicopters,
        }),
        backgroundColor: getBackgroundColor(CO2_CHART_COLORS.helicopters),
        order: 2,
      }),
    [emptyData, filters.helicopters, groupedPhases],
  );
  const externalEnergySupplyDataset = useMemo(
    () =>
      prepareBarDataset({
        enabled: filters.externalEnergySupply,
        groupedPhases,
        label: CO2_CHART_LABELS.externalEnergySupply,
        emptyData,
        dataFunc: (data) => ({
          x: data.date,
          y: data.external_energy_supply,
        }),
        backgroundColor: getBackgroundColor(
          CO2_CHART_COLORS.externalEnergySupply,
        ),
        order: 2,
      }),
    [emptyData, filters.externalEnergySupply, groupedPhases],
  );
  const cementDataset = useMemo(
    () =>
      prepareBarDataset({
        enabled: filters.cement,
        groupedPhases,
        label: CO2_CHART_LABELS.cement,
        emptyData,
        dataFunc: (data) => ({
          x: data.date,
          y: data.cement,
        }),
        backgroundColor: getBackgroundColor(CO2_CHART_COLORS.cement),
        order: 2,
      }),
    [emptyData, filters.cement, groupedPhases],
  );
  const steelDataset = useMemo(
    () =>
      prepareBarDataset({
        enabled: filters.steel,
        groupedPhases,
        label: CO2_CHART_LABELS.steel,
        emptyData,
        dataFunc: (data) => ({
          x: data.date,
          y: data.steel,
        }),
        backgroundColor: getBackgroundColor(CO2_CHART_COLORS.steel),
        order: 2,
      }),
    [emptyData, filters.steel, groupedPhases],
  );
  const emissionReductionInitiativesDatasets = useMemo(
    () =>
      (emissionReductionInitiativesData || []).map(
        (emissionReductionInitiative) =>
          prepareBarDataset({
            enabled:
              filters.emissionReductionInitiatives[
                emissionReductionInitiative.id
              ],
            groupedPhases,
            label: emissionReductionInitiative.name,
            emptyData,
            dataFunc: (data) => ({
              x: data.date,
              y:
                data.emission_reduction_initiatives.find(
                  (stepEmissionReductionInitiative) =>
                    stepEmissionReductionInitiative.id ===
                    emissionReductionInitiative.id,
                )?.value || null,
            }),
            backgroundColor: getBackgroundColor(
              emissionReductionInitiativesColors[
                emissionReductionInitiative.id
              ],
            ),
            order: 2,
          }),
      ),
    [
      emissionReductionInitiativesColors,
      emissionReductionInitiativesData,
      emptyData,
      filters.emissionReductionInitiatives,
      groupedPhases,
    ],
  );
  const targetDataset = useMemo(
    () =>
      prepareLineDataset({
        enabled: filters.target,
        data: dailyWellPlannedPlanCO2Data,
        label: CO2_CHART_LABELS.target,
        dataFunc: (data) => ({
          x: data.date,
          y: calculateTarget(filters, data),
        }),
        borderColor: CO2_CHART_COLORS.target,
        order: 1,
      }),
    [dailyWellPlannedPlanCO2Data, filters],
  );
  const baselineDataset = useMemo(
    () =>
      prepareLineDataset({
        enabled: filters.baseline,
        data: dailyWellPlannedPlanCO2Data,
        label: CO2_CHART_LABELS.baseline,
        dataFunc: (data) => {
          let value = calculateTarget(filters, data);
          for (const emissionReductionInitiative of data.emission_reduction_initiatives) {
            if (
              filters.emissionReductionInitiatives[
                emissionReductionInitiative.id
              ]
            ) {
              value += emissionReductionInitiative.value;
            }
          }
          return {
            x: data.date,
            y: value,
          };
        },
        borderColor: CO2_CHART_COLORS.baseline,
        order: 1,
      }),
    [dailyWellPlannedPlanCO2Data, filters],
  );
  const datasets = useMemo(
    () =>
      (
        [] as (
          | ChartDataset<'bar', CO2ChartData[]>
          | ChartDataset<'line', CO2ChartData[]>
        )[]
      ).concat.apply(
        [],
        [
          rigDatasets,
          vesselsDataset,
          helicoptersDataset,
          externalEnergySupplyDataset,
          cementDataset,
          steelDataset,
          [targetDataset, baselineDataset].filter(notEmpty),
        ].concat(emissionReductionInitiativesDatasets),
      ),
    [
      baselineDataset,
      cementDataset,
      emissionReductionInitiativesDatasets,
      externalEnergySupplyDataset,
      helicoptersDataset,
      rigDatasets,
      steelDataset,
      targetDataset,
      vesselsDataset,
    ],
  );

  return {
    isLoading,
    isRefetching,
    datasets,
  };
};

export default useWellPlanCO2ChartData;
