import { prettyNumber, roundNumber } from 'utils/format';

export const formatDuration = (duration: number) => {
  const formattedDuration = prettyNumber(roundNumber(duration, 2));
  if (duration === 0) {
    return `${formattedDuration} days`;
  }
  if (duration < 2) {
    return `${formattedDuration} day`;
  }
  return `${formattedDuration} days`;
};
