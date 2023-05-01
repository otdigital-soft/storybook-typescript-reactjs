import {
  ChartDataset,
  ChartTypeRegistry,
  LinearScaleOptions,
  ScaleOptionsByType,
} from 'chart.js';
import Color from 'color';
import { CO2ChartData } from 'pages/WellPlan/components/CO2Chart';
import { CO2_CHART_COLORS } from 'pages/WellPlan/consts';
import useEmissionReductionInitiativesColors from 'pages/WellPlan/hooks/useEmissionReductionInitiativesColors';
import {
  aggregateDatasetByDate,
  calculateTarget,
  prepareBarDataset,
  prepareLineDataset,
} from 'pages/WellPlan/utils/chart';
import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { groupByKey, notEmpty } from 'utils/data';
import { CO2_CHART_LABELS, CustomScales } from './consts';
import useWellCompletePlanCommonCO2Data, {
  CommonCO2Data,
  PlanType,
} from './useWellCompletePlanCommonCO2Data';
import useWellReportCO2ChartFilters from './useWellReportCO2ChartFilters';
import useWellPlannerEmissionReductionInitiatives from 'pages/WellPlan/hooks/useWellPlannerEmissionReductionInitiatives';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';

const getBackgroundColor = (color: string) => (data: CommonCO2Data) => {
  return data.plan === PlanType.Planned
    ? Color(color).alpha(0.25).hexa()
    : color;
};

const useWellReportCO2ChartData = ({
  start,
  end,
}: {
  start?: Date;
  end?: Date;
} = {}) => {
  const { colors } = useTheme();
  const { wellPlanId } = useCurrentWellPlan();
  const { data: emissionReductionInitiativeData } =
    useWellPlannerEmissionReductionInitiatives(wellPlanId);
  const emissionReductionInitiativesColors =
    useEmissionReductionInitiativesColors();
  const {
    wellPlannedPlanCO2Data,
    wellCompletePlanCO2Data,
    commonPlanCO2Data,
    commonDays: labels,
    temperatureData,
    waveHeaveData,
    windSpeedData,
    isLoading,
    isRefetching,
  } = useWellCompletePlanCommonCO2Data({
    start,
    end,
  });

  const dailyCompletePlanCO2Data = useMemo(
    () => aggregateDatasetByDate(wellCompletePlanCO2Data || []),
    [wellCompletePlanCO2Data],
  );
  const dailyPlannedPlanCO2Data = useMemo(
    () => aggregateDatasetByDate(wellPlannedPlanCO2Data || []),
    [wellPlannedPlanCO2Data],
  );
  const emptyData = useMemo(
    () =>
      labels.map((day) => ({
        x: day,
        y: null,
      })),
    [labels],
  );
  const [filters] = useWellReportCO2ChartFilters();
  const groupedPhases = useMemo(
    () => groupByKey(commonPlanCO2Data, 'phaseId'),
    [commonPlanCO2Data],
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
  const empsDatasets = useMemo(
    () =>
      (emissionReductionInitiativeData || []).map(
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
      emissionReductionInitiativeData,
      emptyData,
      filters.emissionReductionInitiatives,
      groupedPhases,
    ],
  );
  const targetDataset = useMemo(
    () =>
      prepareLineDataset({
        enabled: filters.target,
        data: dailyPlannedPlanCO2Data,
        label: CO2_CHART_LABELS.target,
        dataFunc: (data) => ({
          x: data.date,
          y: calculateTarget(filters, data),
        }),
        borderColor: CO2_CHART_COLORS.target,
        order: 1,
      }),
    [dailyPlannedPlanCO2Data, filters],
  );
  const baselineDataset = useMemo(
    () =>
      prepareLineDataset({
        enabled: filters.baseline,
        data: dailyPlannedPlanCO2Data,
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
    [dailyPlannedPlanCO2Data, filters],
  );
  const measuredDataset = useMemo(
    () =>
      prepareLineDataset({
        enabled: filters.measured,
        data: dailyCompletePlanCO2Data,
        label: CO2_CHART_LABELS.measured,
        dataFunc: (data) => ({
          x: data.date,
          y: calculateTarget(filters, data),
        }),
        borderColor: CO2_CHART_COLORS.measured,
        order: 1,
      }),
    [dailyCompletePlanCO2Data, filters],
  );
  const cumulativeDataset = useMemo(() => {
    let cumulativeSum = 0;
    return prepareLineDataset({
      enabled: filters.cumulative,
      data: dailyCompletePlanCO2Data,
      label: CO2_CHART_LABELS.cumulative,
      dataFunc: (data) => {
        cumulativeSum += calculateTarget(filters, data);
        return {
          x: data.date,
          y: cumulativeSum,
        };
      },
      borderColor: CO2_CHART_COLORS.cumulative,
      order: 1,
      yAxisID: 'cumulative',
    });
  }, [dailyCompletePlanCO2Data, filters]);
  const windSpeedDataset = useMemo(
    () =>
      prepareLineDataset({
        enabled: filters.windSpeed,
        data: windSpeedData || [],
        label: CO2_CHART_LABELS.windSpeed,
        dataFunc: (data) => ({
          x: data.date,
          y: data.value,
        }),
        borderColor: CO2_CHART_COLORS.windSpeed,
        order: 1,
        yAxisID: 'windSpeed',
      }),
    [filters.windSpeed, windSpeedData],
  );
  const temperatureDataset = useMemo(
    () =>
      prepareLineDataset({
        enabled: filters.temperature,
        data: temperatureData || [],
        label: CO2_CHART_LABELS.temperature,
        dataFunc: (data) => ({
          x: data.date,
          y: data.value,
        }),
        borderColor: CO2_CHART_COLORS.temperature,
        order: 1,
        yAxisID: 'temperature',
      }),
    [filters.temperature, temperatureData],
  );
  const waveHeightDataset = useMemo(
    () =>
      prepareLineDataset({
        enabled: filters.waveHeight,
        data: waveHeaveData || [],
        label: CO2_CHART_LABELS.waveHeight,
        dataFunc: (data) => ({
          x: data.date,
          y: data.value,
        }),
        borderColor: CO2_CHART_COLORS.waveHeight,
        order: 1,
        yAxisID: 'waveHeight',
      }),
    [filters.waveHeight, waveHeaveData],
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
          [
            targetDataset,
            baselineDataset,
            measuredDataset,
            cumulativeDataset,
            windSpeedDataset,
            temperatureDataset,
            waveHeightDataset,
          ].filter(notEmpty),
        ].concat(empsDatasets),
      ),
    [
      baselineDataset,
      cementDataset,
      cumulativeDataset,
      empsDatasets,
      externalEnergySupplyDataset,
      helicoptersDataset,
      measuredDataset,
      rigDatasets,
      steelDataset,
      targetDataset,
      temperatureDataset,
      vesselsDataset,
      waveHeightDataset,
      windSpeedDataset,
    ],
  );
  const scale = useMemo(
    () =>
      ({
        type: 'linear',
        display: 'auto' as const,
        position: 'right',
        ticks: {
          display: true,
          color: colors.blue[6],
          font: {
            lineHeight: 1.66,
            size: 12,
            family: 'Manrope',
          },
        } as LinearScaleOptions['ticks'],
        grid: {
          display: false,
          drawBorder: false,
        } as LinearScaleOptions['grid'],
        title: {
          align: 'end',
          color: colors.blue[6],
          font: {
            lineHeight: 1.66,
            size: 12,
            family: 'Manrope',
          },
          display: true,
        } as LinearScaleOptions['title'],
      } as LinearScaleOptions & { type: 'linear' }),
    [colors.blue],
  );

  const scales: Partial<
    Record<
      CustomScales,
      ScaleOptionsByType<ChartTypeRegistry['line']['scales']>
    >
  > = useMemo(
    () => ({
      [CustomScales.WaveHeight]: {
        ...scale,
        title: {
          ...scale.title,
          text: CO2_CHART_LABELS.waveHeight,
        },
      },
      [CustomScales.Temperature]: {
        ...scale,
        title: {
          ...scale.title,
          text: CO2_CHART_LABELS.temperature,
        },
      },
      [CustomScales.WindSpeed]: {
        ...scale,
        title: {
          ...scale.title,
          text: CO2_CHART_LABELS.windSpeed,
        },
      },
      [CustomScales.Cumulative]: {
        ...scale,
        title: {
          ...scale.title,
          text: CO2_CHART_LABELS.cumulative,
        },
      },
    }),
    [scale],
  );

  return {
    datasets,
    scales,
    isLoading,
    isRefetching,
  };
};

export default useWellReportCO2ChartData;
