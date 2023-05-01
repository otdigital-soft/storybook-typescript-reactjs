import Box, { Flexbox } from 'components/Box';
import { Text, Title } from 'components/Typography';
import React from 'react';
import { prettyNumber, roundNumber } from 'utils/format';

interface WellReportSummaryHeaderProps {
  header: string;
  value: number;
  unit: React.ReactNode;
}

const WellReportSummaryHeader = ({
  header,
  unit,
  value,
}: WellReportSummaryHeaderProps) => {
  return (
    <Flexbox flexDirection="column">
      <Text fontSize={18} lineHeight={1.33}>
        {header}
      </Text>
      <Title level={1}>{prettyNumber(roundNumber(value, 2))}</Title>
      <Box marginTop={5}>
        <Text fontSize={18} lineHeight={1.33}>
          {unit}
        </Text>
      </Box>
    </Flexbox>
  );
};

export default WellReportSummaryHeader;
