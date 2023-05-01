import { Bar } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useChartOptions from 'hooks/useChartOptions';
import { forwardRef } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { WhiteBackground } from 'utils/chart';
import { useTheme } from 'styled-components';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  WhiteBackground,
);

interface BarChartProps {
  metric: string;
  metricUnit?: string;
  labels: string[];
  values: number[];
  precision: number;
}

const BarChart = forwardRef<ChartJSOrUndefined<'bar'>, BarChartProps>(
  ({ metric, metricUnit, labels, values, precision }, ref) => {
    const chatOptions = useChartOptions();
    const { colors } = useTheme();
    return (
      <Bar
        ref={ref}
        options={{
          ...chatOptions,
          scales: {
            ...chatOptions.scales,
            y: {
              ...chatOptions.scales.y,
              title: {
                ...chatOptions.scales.y.title,
                text: metric,
              },
              max: Math.ceil(Math.max(...values) * 1.1),
            },
          },
          plugins: {
            ...chatOptions.plugins,
            legend: {
              display: false,
            },
            tooltip: {
              ...chatOptions.plugins.tooltip,
              mode: 'point',
              callbacks: {
                title: () => '',
                label: function (context) {
                  return metricUnit
                    ? `${context.parsed.y} ${metricUnit}`
                    : String(context.parsed.y);
                },
              },
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              data: values.map((value) => Number(value.toFixed(precision))),
              backgroundColor: colors.gray['4'],
              hoverBackgroundColor: colors.red['6'],
              maxBarThickness: 70,
            },
          ],
        }}
      />
    );
  },
);

export default BarChart;
