import { WellPlannerPlannedStepCO2 } from 'api/schema';
import HorizontalBar, {
  Bar,
  HorizontalBarTitle,
  Separator,
} from 'pages/WellPlan/components/HorizontalBar';
import { CO2_CHART_COLORS } from 'pages/WellPlan/consts';
import useEmissionReductionInitiativesColors from 'pages/WellPlan/hooks/useEmissionReductionInitiativesColors';
import { CO2_CHART_LABELS } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/consts';
import React from 'react';
import { useTheme } from 'styled-components';
import { prettyNumber, roundNumber } from 'utils/format';
import { calculateTotalPercentage } from 'utils/math';
import useWellPlannerEmissionReductionInitiatives from 'pages/WellPlan/hooks/useWellPlannerEmissionReductionInitiatives';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';

interface ExpandedRowCO2ReductionHorizontalBarProps {
  phaseCO2Data: WellPlannerPlannedStepCO2;
}

export const formatCO2 = (value: number) => {
  return (
    <>
      {prettyNumber(roundNumber(value, 2))} CO<sub>2</sub> (Te)
    </>
  );
};

const ExpandedRowCO2ReductionHorizontalBar = ({
  phaseCO2Data,
}: ExpandedRowCO2ReductionHorizontalBarProps) => {
  const { colors } = useTheme();
  const emissionReductionInitiativesColors =
    useEmissionReductionInitiativesColors();
  const { wellPlanId } = useCurrentWellPlan();
  const { data: emissionReductionInitiativesData } =
    useWellPlannerEmissionReductionInitiatives(wellPlanId);

  return (
    <HorizontalBar>
      <Bar
        width={calculateTotalPercentage(
          phaseCO2Data.rig,
          phaseCO2Data.baseline,
        )}
        backgroundColor={CO2_CHART_COLORS.rig}
        title={
          <HorizontalBarTitle
            title={CO2_CHART_LABELS.rig}
            description={formatCO2(phaseCO2Data.rig)}
          />
        }
      />
      <Bar
        width={calculateTotalPercentage(
          phaseCO2Data.vessels,
          phaseCO2Data.baseline,
        )}
        backgroundColor={CO2_CHART_COLORS.vessels}
        title={
          <HorizontalBarTitle
            title={CO2_CHART_LABELS.vessels}
            description={formatCO2(phaseCO2Data.vessels)}
          />
        }
      />
      <Bar
        width={calculateTotalPercentage(
          phaseCO2Data.helicopters,
          phaseCO2Data.baseline,
        )}
        backgroundColor={CO2_CHART_COLORS.helicopters}
        title={
          <HorizontalBarTitle
            title={CO2_CHART_LABELS.helicopters}
            description={formatCO2(phaseCO2Data.helicopters)}
          />
        }
      />
      <Bar
        width={calculateTotalPercentage(
          phaseCO2Data.external_energy_supply,
          phaseCO2Data.baseline,
        )}
        backgroundColor={CO2_CHART_COLORS.externalEnergySupply}
        title={
          <HorizontalBarTitle
            title={CO2_CHART_LABELS.externalEnergySupply}
            description={formatCO2(phaseCO2Data.external_energy_supply)}
          />
        }
      />
      <Bar
        width={calculateTotalPercentage(
          phaseCO2Data.cement,
          phaseCO2Data.baseline,
        )}
        backgroundColor={CO2_CHART_COLORS.cement}
        title={
          <HorizontalBarTitle
            title={CO2_CHART_LABELS.cement}
            description={formatCO2(phaseCO2Data.cement)}
          />
        }
      />
      <Bar
        width={calculateTotalPercentage(
          phaseCO2Data.steel,
          phaseCO2Data.baseline,
        )}
        backgroundColor={CO2_CHART_COLORS.steel}
        title={
          <HorizontalBarTitle
            title={CO2_CHART_LABELS.steel}
            description={formatCO2(phaseCO2Data.steel)}
          />
        }
      />
      <Separator borderStyle="dashed" borderColor={colors.deepOcean[1]} />
      {phaseCO2Data.emission_reduction_initiatives
        .filter(
          (emissionReductionInitiative) => emissionReductionInitiative.value,
        )
        .map((emp, index, array) => {
          return (
            <React.Fragment key={emp.id}>
              <Bar
                width={calculateTotalPercentage(
                  emp.value,
                  phaseCO2Data.baseline,
                )}
                backgroundColor={emissionReductionInitiativesColors[emp.id]}
                title={
                  <HorizontalBarTitle
                    title={
                      emissionReductionInitiativesData?.find(
                        (emissionReductionInitiative) =>
                          emissionReductionInitiative.id === emp.id,
                      )?.name || ''
                    }
                    description={formatCO2(-emp.value)}
                  />
                }
              />
              {index + 1 !== array.length ? (
                <Separator borderStyle="solid" borderColor={colors.white} />
              ) : null}
            </React.Fragment>
          );
        })}
    </HorizontalBar>
  );
};

export default ExpandedRowCO2ReductionHorizontalBar;
