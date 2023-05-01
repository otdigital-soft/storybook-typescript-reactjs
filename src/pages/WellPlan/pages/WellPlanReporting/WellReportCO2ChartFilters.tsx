import { EmissionReductionInitiativeTypeEnum } from 'api/schema';
import { Flexbox } from 'components/Box';
import ChartToggle from 'pages/WellPlan/components/ChartToggle';
import { CO2_CHART_COLORS } from 'pages/WellPlan/consts';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useEmissionReductionInitiativesColors from 'pages/WellPlan/hooks/useEmissionReductionInitiativesColors';
import useWellPlannerEmissionReductionInitiatives from 'pages/WellPlan/hooks/useWellPlannerEmissionReductionInitiatives';
import { CO2_CHART_LABELS } from './consts';
import useWellReportCO2ChartFilters from './useWellReportCO2ChartFilters';

const WellReportCO2ChartFilters = () => {
  const { wellPlanId } = useCurrentWellPlan();
  const { data: emissionReductionInitiativesData } =
    useWellPlannerEmissionReductionInitiatives(wellPlanId);
  const [filters, dispatch] = useWellReportCO2ChartFilters();
  const emissionReductionInitiativesColors =
    useEmissionReductionInitiativesColors();

  return (
    <Flexbox alignItems="space-between" flexDirection="column">
      <Flexbox gap={1} flexWrap="wrap">
        <ChartToggle
          label={CO2_CHART_LABELS.baseline}
          type="line"
          enabled={filters.baseline}
          color={CO2_CHART_COLORS.baseline}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'baseline',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.target}
          type="line"
          enabled={filters.target}
          color={CO2_CHART_COLORS.target}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'target',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.measured}
          type="line"
          enabled={filters.measured}
          color={CO2_CHART_COLORS.measured}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'measured',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.cumulative}
          type="line"
          enabled={filters.cumulative}
          color={CO2_CHART_COLORS.cumulative}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'cumulative',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.temperature}
          type="line"
          enabled={filters.temperature}
          color={CO2_CHART_COLORS.temperature}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'temperature',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.windSpeed}
          type="line"
          enabled={filters.windSpeed}
          color={CO2_CHART_COLORS.windSpeed}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'windSpeed',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.waveHeight}
          type="line"
          enabled={filters.waveHeight}
          color={CO2_CHART_COLORS.waveHeight}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'waveHeight',
            })
          }
        />
      </Flexbox>
      <Flexbox gap={1} flexWrap="wrap" justifyContent="flex-end">
        <ChartToggle
          label={CO2_CHART_LABELS.rig}
          type="circle"
          enabled={filters.rig}
          color={CO2_CHART_COLORS.rig}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'rig',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.vessels}
          type="circle"
          enabled={filters.vessels}
          color={CO2_CHART_COLORS.vessels}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'vessels',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.helicopters}
          type="circle"
          enabled={filters.helicopters}
          color={CO2_CHART_COLORS.helicopters}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'helicopters',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.externalEnergySupply}
          type="circle"
          enabled={filters.externalEnergySupply}
          color={CO2_CHART_COLORS.externalEnergySupply}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'externalEnergySupply',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.cement}
          type="circle"
          enabled={filters.cement}
          color={CO2_CHART_COLORS.cement}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'cement',
            })
          }
        />
        <ChartToggle
          label={CO2_CHART_LABELS.steel}
          type="circle"
          enabled={filters.steel}
          color={CO2_CHART_COLORS.steel}
          onClick={() =>
            dispatch({
              type: 'toggleFilter',
              filter: 'steel',
            })
          }
        />
        {emissionReductionInitiativesData
          ?.filter(
            (emissionReductionInitiative) =>
              emissionReductionInitiative.type !==
              EmissionReductionInitiativeTypeEnum.PRODUCTIVITY,
          )
          .map((emissionReductionInitiative) => (
            <ChartToggle
              key={emissionReductionInitiative.id}
              label={emissionReductionInitiative.name}
              type="circle"
              enabled={
                filters.emissionReductionInitiatives[
                  emissionReductionInitiative.id
                ]
              }
              color={
                emissionReductionInitiativesColors[
                  emissionReductionInitiative.id
                ]
              }
              onClick={() =>
                dispatch({
                  type: 'toggleEmissionReductionInitiativeFilter',
                  emissionReductionInitiativeId: emissionReductionInitiative.id,
                })
              }
            />
          ))}
      </Flexbox>
    </Flexbox>
  );
};

export default WellReportCO2ChartFilters;
