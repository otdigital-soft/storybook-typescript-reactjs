import { Text } from 'components/Typography';
import Box, { Flexbox } from 'components/Box';
import { Phase } from './PhaseTimeline';

interface PhaseLineProps {
  phase: Phase;
  first: boolean;
  last: boolean;
  durationPercentage: number;
}

const PhaseLine = ({
  phase,
  first,
  last,
  durationPercentage,
}: PhaseLineProps) => {
  let lineWidth;
  if (first) {
    lineWidth = `calc(${durationPercentage}% - 8px)`;
  } else if (last) {
    lineWidth = `calc(${durationPercentage}% - 20px)`;
  } else {
    lineWidth = `calc(${durationPercentage}% - 16px)`;
  }

  return (
    <Flexbox
      flexDirection="column"
      gap={7}
      width={lineWidth}
      alignSelf="flex-start"
    >
      <Text fontSize={10} lineHeight="16px" type="secondary" ellipsis>
        {first ? (
          <Text strong width={36} display="inline-block" type="secondary">
            Phase:
          </Text>
        ) : null}
        {phase.name}
      </Text>
      <Box backgroundColor={phase.lineColor} height={8} borderRadius={5} />
      {phase.mode ? (
        <Text fontSize={10} lineHeight="16px" type="secondary" ellipsis>
          {first ? (
            <Text strong width={36} display="inline-block" type="secondary">
              Mode:
            </Text>
          ) : null}
          {phase.mode}
        </Text>
      ) : null}
    </Flexbox>
  );
};

export default PhaseLine;
