import Box, { Flexbox } from 'components/Box';
import { useTheme } from 'styled-components';

const StatusCell = ({ draft }: { draft: boolean }) => {
  const { colors } = useTheme();

  return (
    <Flexbox justifyContent="space-between" alignItems="center" gap={8}>
      <span>{draft ? 'In progress' : 'Complete'}</span>
      <Box
        width={16}
        height={16}
        flexShrink={0}
        borderRadius="50%"
        backgroundColor={draft ? colors.sunset['3'] : colors.turquoise['1']}
      />
    </Flexbox>
  );
};

export default StatusCell;
