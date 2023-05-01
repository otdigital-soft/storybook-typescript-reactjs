import Box, { Flexbox } from 'components/Box';
import React from 'react';
import { sumValues } from 'utils/math';
import PhaseLine from './PhaseLine';

export interface Phase {
  name: string;
  mode?: string;
  lineColor: string;
  circleColor: string;
  duration: number;
}

interface PhaseTimelineProps {
  phases: Phase[];
}

function sumDurations(phases: Phase[]) {
  return sumValues(phases.map((phase) => phase.duration));
}

const PhaseTimeline = ({ phases }: PhaseTimelineProps) => {
  const totalDuration = sumDurations(phases);

  return (
    <Flexbox gap={4} alignItems="center" width="100%">
      {phases.map((phase, index) => {
        const last = index + 1 === phases.length;

        return (
          <React.Fragment key={index}>
            <PhaseLine
              first={!index}
              last={last}
              phase={phase}
              durationPercentage={(phase.duration / totalDuration) * 100}
            />
            <Box
              backgroundColor={phase.circleColor}
              width={8}
              height={8}
              borderRadius="50%"
              flexShrink={0}
            />
          </React.Fragment>
        );
      })}
    </Flexbox>
  );
};

export default PhaseTimeline;
