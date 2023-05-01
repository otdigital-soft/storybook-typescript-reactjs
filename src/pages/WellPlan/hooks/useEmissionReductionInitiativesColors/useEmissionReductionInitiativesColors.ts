import Color from 'color';
import { CO2_CHART_COLORS } from 'pages/WellPlan/consts';
import { useMemo } from 'react';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellPlannerEmissionReductionInitiatives from 'pages/WellPlan/hooks/useWellPlannerEmissionReductionInitiatives';

export function lightenColor(baseColor: string, ratio: number) {
  return Color(baseColor).lighten(ratio).hex();
}

const useEmissionReductionInitiativesColors = () => {
  const { wellPlanId } = useCurrentWellPlan();
  const { data: emissionReductionInitiativesData } =
    useWellPlannerEmissionReductionInitiatives(wellPlanId);
  return useMemo(
    () =>
      (emissionReductionInitiativesData || []).reduce(
        (previousValue, currentValue, currentIndex, array) => {
          previousValue[currentValue.id] = lightenColor(
            CO2_CHART_COLORS.emp,
            currentIndex / (array.length + 1) / 2,
          );
          return previousValue;
        },
        {} as Record<string, string>,
      ),
    [emissionReductionInitiativesData],
  );
};

export default useEmissionReductionInitiativesColors;
