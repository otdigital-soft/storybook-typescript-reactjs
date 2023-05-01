import Box, { Flexbox } from 'components/Box';
import { Doughnut } from 'react-chartjs-2';
import { Text } from 'components/Typography';
import { prettyNumber, roundNumber } from 'utils/format';
import ChartToggle from 'pages/WellPlan/components/ChartToggle';
import { useState } from 'react';
import { Chart } from 'chart.js';

interface WellReportSummaryChartProps {
  labels: [string, string];
  data: [number, number];
  backgroundColor: [string, string];
  onComplete?: (this: Chart, event: unknown) => void;
}

const WellReportSummaryChart = ({
  labels,
  data,
  backgroundColor,
  onComplete,
}: WellReportSummaryChartProps) => {
  const [filters, setFilters] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });

  return (
    <>
      <Box>
        <Doughnut
          options={{
            animation: {
              onComplete,
            },
            maintainAspectRatio: false,
            circumference: 180,
            rotation: -90,
            cutout: '75%',
            doughnut: {
              datasets: {
                borderWidth: 0,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
          }}
          data={{
            labels: labels,
            datasets: [
              {
                data: data.map(
                  (value, index) => Number(filters[index]) * value,
                ),
                backgroundColor: backgroundColor,
              },
            ],
          }}
        />
      </Box>
      <Box>
        <Flexbox justifyContent="space-between" gap={8}>
          {data
            .filter((value, index) => filters[index])
            .map((value, index) => (
              <Text fontSize={18} lineHeight={1.33} key={index}>
                {prettyNumber(roundNumber(value, 2))}
              </Text>
            ))}
        </Flexbox>
        <Flexbox gap={1} marginTop={7} marginLeft={-8}>
          {data.map((value, index) => (
            <ChartToggle
              key={index}
              label={labels[index]}
              type="circle"
              enabled={filters[index]}
              color={backgroundColor[index]}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  [index]: !prev[index],
                }))
              }
            />
          ))}
        </Flexbox>
      </Box>
    </>
  );
};

export default WellReportSummaryChart;
