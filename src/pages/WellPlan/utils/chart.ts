import { ChartDataset } from 'chart.js';
import { CO2ChartData } from 'pages/WellPlan/components/CO2Chart';
import {
  WellPlannerCO2Dataset,
  WellPlannerCO2EmissionReductionInitiative,
} from 'api/schema';
import { sumValues } from 'utils/math';
import { groupByKey } from 'utils/data';

export function mergeDatasets(
  firstDataset: CO2ChartData[],
  secondDataset: CO2ChartData[],
) {
  return firstDataset.map(
    (firstItem) =>
      secondDataset.find((secondItem) => firstItem.x === secondItem.x) ||
      firstItem,
  );
}

export function prepareBarDataset<
  K extends string,
  D,
  T extends Record<K, D[]>,
>({
  groupedPhases,
  label,
  emptyData,
  dataFunc,
  enabled,
  backgroundColor,
  order,
}: {
  groupedPhases: T;
  label: string;
  emptyData: CO2ChartData[];
  dataFunc: (value: D, index: number, array: D[]) => CO2ChartData;
  enabled: boolean;
  backgroundColor: (data: D) => string;
  order: number;
}): ChartDataset<'bar', CO2ChartData[]>[] {
  return enabled
    ? (Object.keys(groupedPhases) as K[]).map((groupKey) => ({
        label: label,
        data: mergeDatasets(
          emptyData,
          groupedPhases[groupKey].map(dataFunc) || [],
        ),
        type: 'bar',
        backgroundColor: backgroundColor(groupedPhases[groupKey][0]),
        stack: groupKey,
        skipNull: true,
        order,
      }))
    : [];
}

export function prepareLineDataset<T>({
  data,
  label,
  dataFunc,
  enabled,
  borderColor,
  order,
  yAxisID,
}: {
  data: T[];
  label: string;
  dataFunc: (value: T, index: number, array: T[]) => CO2ChartData;
  enabled: boolean;
  borderColor: string;
  order: number;
  yAxisID?: string;
}): ChartDataset<'line', CO2ChartData[]> | null {
  if (!enabled) {
    return null;
  }
  return {
    label: label,
    data: data.map(dataFunc),
    type: 'line' as const,
    borderColor,
    backgroundColor: borderColor,
    borderDash: [4, 2],
    order,
    yAxisID,
  };
}

export function calculateTarget(
  filters: {
    rig: boolean;
    vessels: boolean;
    externalEnergySupply: boolean;
    helicopters: boolean;
    cement: boolean;
    steel: boolean;
  },
  data: {
    rig: number;
    vessels: number;
    external_energy_supply: number;
    helicopters: number;
    cement: number;
    steel: number;
  },
) {
  return (
    Number(filters.rig) * data.rig +
    Number(filters.vessels) * data.vessels +
    Number(filters.externalEnergySupply) * data.external_energy_supply +
    Number(filters.helicopters) * data.helicopters +
    Number(filters.cement) * data.cement +
    Number(filters.steel) * data.steel
  );
}

type CO2Values = {
  date: string;
  rig: number;
  vessels: number;
  helicopters: number;
  external_energy_supply: number;
  cement: number;
  steel: number;
  emission_reduction_initiatives: WellPlannerCO2EmissionReductionInitiative[];
};

function sumCO2Data(first: CO2Values, second: CO2Values): CO2Values {
  const emissionReductionInitiatives = [
    ...first.emission_reduction_initiatives,
    ...second.emission_reduction_initiatives,
  ];
  const emissionReductionInitiativesIds = [
    ...new Set(
      emissionReductionInitiatives.map(
        (emissionReductionInitiative) => emissionReductionInitiative.id,
      ),
    ),
  ];
  return {
    date: first.date,
    rig: first.rig + second.rig,
    vessels: first.vessels + second.vessels,
    helicopters: first.helicopters + second.helicopters,
    external_energy_supply:
      first.external_energy_supply + second.external_energy_supply,
    cement: first.cement + second.cement,
    steel: first.steel + second.steel,
    emission_reduction_initiatives: emissionReductionInitiativesIds.map(
      (emissionReductionInitiativeId) => ({
        id: emissionReductionInitiativeId,
        value: sumValues(
          emissionReductionInitiatives
            .filter(
              (emissionReductionInitiative) =>
                emissionReductionInitiative.id ===
                emissionReductionInitiativeId,
            )
            .map(
              (emissionReductionInitiative) =>
                emissionReductionInitiative.value,
            ),
        ),
      }),
    ),
  };
}

export function aggregateDatasetByDate(
  data: WellPlannerCO2Dataset[],
): CO2Values[] {
  const groupedByData = groupByKey(data, 'date');
  return Object.entries(groupedByData).map(([date, group]) => {
    return {
      ...group.reduce<CO2Values>(
        (previousValue, currentValue) => {
          return sumCO2Data(previousValue, currentValue);
        },
        {
          date: date,
          rig: 0,
          vessels: 0,
          helicopters: 0,
          external_energy_supply: 0,
          cement: 0,
          steel: 0,
          emission_reduction_initiatives: [],
        },
      ),
    };
  });
}
