import { MonitorElementDataset } from 'api/schema';
import { Bar } from 'react-chartjs-2';
import {
  CategoryScale,
  Chart,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  LegendItem,
} from 'chart.js';
import { LABELS, LEGEND_ORDER } from 'pages/Monitor/consts';
import useChartOptions from 'hooks/useChartOptions';
import { forwardRef } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { WhiteBackground } from 'utils/chart';
import { formatDateString } from 'utils/date';
import { DATE_FORMAT_SHORT } from 'consts';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  WhiteBackground,
);

interface BarChartProps {
  data: MonitorElementDataset[];
  valueTitle: string;
  valueUnit: string;
  precision: number;
}

export const COLORS = {
  target: '#F4CCCF',
  cumulative: '#FF9EA2',
  baseline: '#F1F2F5',
};

const BarChart = forwardRef<ChartJSOrUndefined<'bar'>, BarChartProps>(
  ({ data, valueTitle, valueUnit, precision }, ref) => {
    const chatOptions = useChartOptions();
    return (
      <Bar
        ref={ref}
        options={{
          ...chatOptions,
          scales: {
            ...chatOptions.scales,
            x: {
              ...chatOptions.scales.x,
              stacked: true,
            },
            y: {
              ...chatOptions.scales.y,
              stacked: false,
              title: {
                ...chatOptions.scales.y.title,
                text: valueTitle,
              },
            },
          },
          plugins: {
            ...chatOptions.plugins,
            legend: {
              ...chatOptions.plugins.legend,
              labels: {
                ...chatOptions.plugins.legend.labels,
                sort: (a: LegendItem, b: LegendItem) => {
                  return LEGEND_ORDER[a.text] - LEGEND_ORDER[b.text];
                },
              },
            },
            tooltip: {
              ...chatOptions.plugins.tooltip,
              mode: 'point',
              callbacks: {
                title: () => '',
                label: function (context) {
                  return `${context.dataset.label}: ${context.parsed.y} ${valueUnit}`;
                },
              },
            },
          },
        }}
        data={{
          labels: data.map((monitorElement) =>
            formatDateString(monitorElement.date, DATE_FORMAT_SHORT),
          ),
          datasets: [
            {
              label: LABELS.target,
              data: data.map((monitorElement) =>
                monitorElement.target !== null
                  ? Number(monitorElement.target.toFixed(precision))
                  : 0,
              ),
              backgroundColor: COLORS.target,
              maxBarThickness: 20,
            },
            {
              label: LABELS.value,
              data: data.map((monitorElement) =>
                monitorElement.current !== null
                  ? Number(monitorElement.current.toFixed(precision))
                  : 0,
              ),
              backgroundColor: COLORS.cumulative,
              maxBarThickness: 20,
            },
            {
              label: LABELS.baseline,
              data: data.map((monitorElement) =>
                monitorElement.baseline !== null
                  ? Number(monitorElement.baseline.toFixed(precision))
                  : 0,
              ),
              backgroundColor: COLORS.baseline,
              maxBarThickness: 20,
            },
          ],
        }}
      />
    );
  },
);

export default BarChart;
