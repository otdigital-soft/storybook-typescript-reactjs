import Box, { Flexbox } from 'components/Box';
import { Text } from 'components/Typography';

interface ChartToggleProps {
  label: string;
  type: 'circle' | 'line';
  enabled: boolean;
  color: string;
  onClick?: () => void;
}

const ChartToggle = ({
  label,
  type,
  color,
  onClick,
  enabled,
}: ChartToggleProps) => {
  return (
    <Box
      paddingY={4}
      paddingRight={10}
      paddingLeft={8}
      cursor="pointer"
      flexShrink={0}
      onClick={onClick}
    >
      <Flexbox gap={6} alignItems="center">
        {type === 'circle' ? (
          <Box
            borderRadius="50%"
            width={11}
            height={11}
            backgroundColor={color}
          />
        ) : null}
        {type === 'line' ? (
          <Flexbox alignItems="center" gap={3}>
            <Box
              borderRadius="50%"
              width={6}
              height={6}
              backgroundColor={color}
            />
            <Box
              width={5}
              height={2}
              backgroundColor={color}
              borderRadius={2}
            />
            <Box
              borderRadius="50%"
              width={6}
              height={6}
              backgroundColor={color}
            />
          </Flexbox>
        ) : null}
        <Text
          type="secondary"
          fontSize={12}
          lineHeight="20px"
          display="inline-block"
          style={enabled ? undefined : { textDecoration: 'line-through' }}
        >
          {label}
        </Text>
      </Flexbox>
    </Box>
  );
};

export default ChartToggle;
