import { Line } from 'react-chartjs-2';
import { MonitorElementDataset } from 'api/schema';
import {
  CategoryScale,
  Chart,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ChartArea,
  LegendItem,
} from 'chart.js';
import useChartOptions from 'hooks/useChartOptions';
import { LABELS, LEGEND_ORDER } from 'pages/Monitor/consts';
import { useTheme } from 'styled-components';
import { forwardRef } from 'react';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { WhiteBackground } from 'utils/chart';
import { formatDateString } from 'utils/date';
import { DATE_FORMAT_SHORT } from 'consts';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  WhiteBackground,
);

interface LineChartProps {
  data: MonitorElementDataset[];
  valueTitle: string;
  valueUnit: string;
  precision: number;
}

export const COLORS = {
  cumulative: ['#FFAAAD', '#FF7B80'],
};

let width: number, height: number, gradient: CanvasGradient;
function getGradient(ctx: CanvasRenderingContext2D, chartArea: ChartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, COLORS.cumulative[0]);
    gradient.addColorStop(1, COLORS.cumulative[1]);
  }

  return gradient;
}

const LineChart = forwardRef<ChartJSOrUndefined<'line'>, LineChartProps>(
  ({ data, valueUnit, valueTitle, precision }, ref) => {
    const chatOptions = useChartOptions();
    const { colors } = useTheme();
    return (
      <Line
        ref={ref}
        options={{
          ...chatOptions,
          interaction: {
            intersect: false,
          },
          scales: {
            ...chatOptions.scales,
            y: {
              ...chatOptions.scales.y,
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
                  : null,
              ),
              fill: false,
              backgroundColor: colors.gray[4],
              borderWidth: 2,
              borderColor: colors.gray[4],
              borderDash: [8, 4],
              pointRadius: 0,
              pointHoverBackgroundColor: colors.white,
              pointHoverBorderColor: colors.gray[4],
              pointHoverBorderWidth: 2,
              pointHoverRadius: 7.5,
              order: 1,
              tension: 0.2,
            },
            {
              label: LABELS.baseline,
              data: data.map((monitorElement) =>
                monitorElement.baseline !== null
                  ? Number(monitorElement.baseline.toFixed(precision))
                  : null,
              ),
              fill: false,
              backgroundColor: colors.blue[4],
              borderColor: colors.blue[4],
              borderWidth: 2,
              order: 2,
              borderDash: [8, 4],
              pointHoverBackgroundColor: colors.white,
              pointHoverBorderColor: colors.blue[4],
              pointHoverBorderWidth: 2,
              pointHoverRadius: 7.5,
              tension: 0.2,
              pointRadius: 0,
            },
            {
              label: LABELS.value,
              data: data.map((monitorElement) =>
                monitorElement.current !== null
                  ? Number(monitorElement.current.toFixed(precision))
                  : null,
              ),
              fill: true,
              backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;

                if (!chartArea) {
                  // This case happens on initial chart load
                  return;
                }
                return getGradient(ctx, chartArea);
              },
              borderWidth: 0,
              pointHoverBackgroundColor: colors.white,
              pointHoverBorderColor: COLORS.cumulative[1],
              pointHoverBorderWidth: 2,
              pointHoverRadius: 7.5,
              pointRadius: 0,
              order: 3,
              tension: 0.2,
            },
          ],
        }}
      />
    );
  },
);

export default LineChart;
