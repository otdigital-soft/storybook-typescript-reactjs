import { CurrentStepEnum } from 'api/schema';
import Box, { Flexbox } from 'components/Box';
import { useTheme } from 'styled-components';

const WellStatusCell = ({ currentStep }: { currentStep: CurrentStepEnum }) => {
  const { colors } = useTheme();
  const [status, statusColor] = {
    [CurrentStepEnum.WELL_PLANNING]: ['In progress', colors.volcano['6']],
    [CurrentStepEnum.WELL_REVIEWING]: ['Plan complete', colors.sunset['3']],
    [CurrentStepEnum.WELL_REPORTING]: ['Well complete', colors.turquoise['1']],
  }[currentStep];

  return (
    <Flexbox justifyContent="space-between" alignItems="center" gap={8}>
      <span>{status}</span>
      <Box
        width={16}
        height={16}
        flexShrink={0}
        borderRadius="50%"
        backgroundColor={statusColor}
      />
    </Flexbox>
  );
};

export default WellStatusCell;
