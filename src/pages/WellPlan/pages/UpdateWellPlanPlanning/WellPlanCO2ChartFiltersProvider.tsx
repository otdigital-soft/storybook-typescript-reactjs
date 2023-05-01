import {
  ChartFiltersAction,
  chartFiltersReducer,
} from 'pages/WellPlan/utils/chartFilters';
import { createContext, Dispatch, useMemo, useReducer } from 'react';
import useWellPlannerEmissionReductionInitiatives from 'pages/WellPlan/hooks/useWellPlannerEmissionReductionInitiatives';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';

interface WellPlanCO2ChartFiltersProviderProps {
  children: JSX.Element;
}

export type State = {
  baseline: boolean;
  target: boolean;
  rig: boolean;
  vessels: boolean;
  helicopters: boolean;
  externalEnergySupply: boolean;
  cement: boolean;
  steel: boolean;
  emissionReductionInitiatives: Record<number, boolean>;
};

export const WellPlanCO2ChartFiltersContext = createContext<
  [State, Dispatch<ChartFiltersAction<State>>] | null
>(null);

const WellPlanCO2ChartFiltersProvider = ({
  children,
}: WellPlanCO2ChartFiltersProviderProps) => {
  const { wellPlanId } = useCurrentWellPlan();
  const { data: emissionReductionInitiativesData } =
    useWellPlannerEmissionReductionInitiatives(wellPlanId);
  const initialState: State = useMemo(() => {
    const initialEmissionReductionInitiatives: Record<number, boolean> = {};
    for (const emissionReductionInitiative of emissionReductionInitiativesData ||
      []) {
      initialEmissionReductionInitiatives[emissionReductionInitiative.id] =
        true;
    }
    return {
      emissionReductionInitiatives: initialEmissionReductionInitiatives,
      cement: true,
      rig: true,
      externalEnergySupply: true,
      steel: true,
      helicopters: true,
      vessels: true,
      baseline: true,
      target: true,
    };
  }, [emissionReductionInitiativesData]);
  const [state, dispatch] = useReducer(chartFiltersReducer, initialState);

  return (
    <WellPlanCO2ChartFiltersContext.Provider value={[state as State, dispatch]}>
      {children}
    </WellPlanCO2ChartFiltersContext.Provider>
  );
};

export default WellPlanCO2ChartFiltersProvider;
