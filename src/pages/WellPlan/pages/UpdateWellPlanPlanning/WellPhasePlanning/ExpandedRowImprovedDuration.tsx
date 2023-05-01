import Box, { Flexbox } from 'components/Box';
import { Text } from 'components/Typography';
import { WellPlannerDetailsPlannedStep } from 'api/schema';
import { formatDuration } from 'pages/WellPlan/utils/duration';
import ExpandedRowDurationHorizontalBar from './ExpandedRowDurationHorizontalBar';

interface ExpandedRowImprovedDurationProps {
  wellPlanStep: WellPlannerDetailsPlannedStep;
}

const ExpandedRowImprovedDuration = ({
  wellPlanStep,
}: ExpandedRowImprovedDurationProps) => {
  return (
    <>
      <Flexbox justifyContent="space-between">
        <Text strong fontSize={12}>
          Improved duration:
        </Text>
        <Text fontSize={12}>Operational efficiencies</Text>
      </Flexbox>
      <Box marginTop={12} marginBottom={2}>
        <ExpandedRowDurationHorizontalBar
          duration={wellPlanStep.duration}
          improvedDuration={wellPlanStep.improved_duration}
        />
      </Box>
      <Flexbox justifyContent="space-between">
        <Flexbox flexDirection="column">
          <Text fontSize={8} lineHeight={1.75}>
            Improved
          </Text>
          <Text fontSize={12} lineHeight={1.16} strong>
            {formatDuration(wellPlanStep.improved_duration)}
          </Text>
        </Flexbox>
        <Flexbox flexDirection="column" alignItems="flex-end">
          <Text fontSize={8} lineHeight={1.75}>
            Planned
          </Text>
          <Text fontSize={12} lineHeight={1.16} strong>
            {formatDuration(wellPlanStep.duration)}
          </Text>
        </Flexbox>
      </Flexbox>
    </>
  );
};

export default ExpandedRowImprovedDuration;
