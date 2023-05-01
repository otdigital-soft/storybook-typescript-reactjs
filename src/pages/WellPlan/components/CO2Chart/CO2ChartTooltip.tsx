import { memo } from 'react';
import { Container } from './CO2ChartTooltip.styled';
import theme from 'style/theme';
import { ThemeProvider } from 'styled-components';
import Box, { Flexbox } from 'components/Box';
import { Text } from 'components/Typography';
import { prettyNumber, roundNumber } from 'utils/format';

interface CO2ChartTooltipProps {
  title: string;
  elements: {
    name: string;
    color: string;
    value: number;
    after?: string;
  }[];
  xOverflow: boolean;
}

const CO2ChartTooltip = ({
  title,
  elements,
  xOverflow,
}: CO2ChartTooltipProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Container xOverflow={xOverflow}>
        <Box marginY={1} marginX={8}>
          <Text fontSize={8} lineHeight={2} color="gray.6">
            {title}
          </Text>
        </Box>
        <Flexbox marginTop={1} flexDirection="column" gap={1}>
          {elements.map((element, index) => (
            <Flexbox
              key={index}
              paddingY={1}
              marginRight={3}
              marginLeft={8}
              alignItems="center"
            >
              <Box
                width={11}
                height={11}
                borderRadius="50%"
                backgroundColor={element.color}
                flexShrink={0}
              />

              <Flexbox marginX={6} flexGrow={1} minWidth={0}>
                <Text fontSize={8} lineHeight={2} color="gray.6" ellipsis>
                  {element.name}
                </Text>
              </Flexbox>
              <Box flexShrink={0}>
                <Text fontSize={8} lineHeight={2} color="gray.10">
                  {prettyNumber(roundNumber(element.value, 2))}
                  {element.after ? ` ${element.after}` : undefined}
                </Text>
              </Box>
            </Flexbox>
          ))}
        </Flexbox>
      </Container>
    </ThemeProvider>
  );
};

export default memo(CO2ChartTooltip);
