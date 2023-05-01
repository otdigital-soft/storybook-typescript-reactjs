import Box, { Flexbox } from 'components/Box';
import { Text } from 'components/Typography';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellPlannedStepCO2 from 'pages/WellPlan/hooks/useWellPlannedStepCO2';
import { prettyNumber, roundNumber } from 'utils/format';
import { Spin } from 'antd';
import ExpandedRowCO2ReductionHorizontalBar from './ExpandedRowCO2ReductionHorizontalBar';

interface ExpandedRowCO2ReductionProps {
  wellPlanStepId: number;
}

const ExpandedRowCO2Reduction = ({
  wellPlanStepId,
}: ExpandedRowCO2ReductionProps) => {
  const { wellPlanId } = useCurrentWellPlan();
  const { data: wellPlannedStepCO2Data } = useWellPlannedStepCO2(
    wellPlanId,
    wellPlanStepId,
  );
  const saving =
    (wellPlannedStepCO2Data?.baseline || 0) -
    (wellPlannedStepCO2Data?.target || 0);

  if (!wellPlannedStepCO2Data) {
    return (
      <Flexbox justifyContent="center" height={50} alignItems="center">
        <Spin size="small" />
      </Flexbox>
    );
  }

  return (
    <>
      <Flexbox justifyContent="space-between">
        <Text strong fontSize={12}>
          C02 reduction:
        </Text>
        <Text fontSize={12}>Combined initiatives</Text>
      </Flexbox>
      <Box marginTop={12} marginBottom={2}>
        <ExpandedRowCO2ReductionHorizontalBar
          phaseCO2Data={wellPlannedStepCO2Data}
        />
      </Box>
      <Flexbox justifyContent="space-between">
        <Flexbox flexDirection="column">
          <Text fontSize={8} lineHeight={1.75}>
            Target
          </Text>
          <Text fontSize={12} lineHeight={1.16} strong>
            {prettyNumber(roundNumber(wellPlannedStepCO2Data.target, 2))}
            {saving ? ` (${prettyNumber(roundNumber(-saving, 2))})` : ''} CO
            <sub>2</sub> Te
          </Text>
        </Flexbox>
        <Flexbox flexDirection="column" alignItems="flex-end">
          <Text fontSize={8} lineHeight={1.75}>
            Baseline
          </Text>
          <Text fontSize={12} lineHeight={1.16} strong>
            {prettyNumber(roundNumber(wellPlannedStepCO2Data.baseline, 2))} CO
            <sub>2</sub> Te
          </Text>
        </Flexbox>
      </Flexbox>
    </>
  );
};

export default ExpandedRowCO2Reduction;
