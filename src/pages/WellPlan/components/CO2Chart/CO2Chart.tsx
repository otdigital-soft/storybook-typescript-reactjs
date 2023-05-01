import {
  Chart,
  ChartDataset,
  ChartTypeRegistry,
  Scale,
  ScaleOptionsByType,
  TimeScale,
  TimeUnit,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTheme } from 'styled-components';
import { externalTooltipHandler } from './tooltip';
import { forwardRef, memo } from 'react';
import zoomPlugin from 'chartjs-plugin-zoom';
import 'chartjs-adapter-date-fns';
import { enUS } from 'date-fns/locale';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { DATE_FORMAT_SHORT, TIME_FORMAT_SHORT } from 'consts';

Chart.register(zoomPlugin, TimeScale);

export type CO2ChartData = {
  x: string;
  y: number | null;
};

export interface CO2ChartProps {
  datasets: (
    | ChartDataset<'bar', CO2ChartData[]>
    | ChartDataset<'line', CO2ChartData[]>
  )[];
  afterYScaleFit?: (scale: Scale) => void;
  yScales?: Record<
    string,
    ScaleOptionsByType<ChartTypeRegistry['line']['scales']>
  >;
  onComplete?: (this: Chart, event: unknown) => void;
  onXScaleUpdate?: (min: number, max: number) => void;
  onZoomUpdate?: (zoomLevel: number) => void;
  xScaleLimitMin?: number;
  xScaleLimitMax?: number;
  xScaleTimeUnit: TimeUnit;
}

const CO2Chart = forwardRef<
  ChartJSOrUndefined<'bar', CO2ChartData[]>,
  CO2ChartProps
>(
  (
    {
      datasets,
      afterYScaleFit,
      yScales,
      onComplete,
      onXScaleUpdate,
      onZoomUpdate,
      xScaleLimitMin,
      xScaleLimitMax,
      xScaleTimeUnit,
    },
    ref,
  ) => {
    const { colors } = useTheme();
    const ticks = {
      font: {
        size: 12,
        lineHeight: 1.66,
        family: 'Manrope',
      },
      color: colors.blue[6],
    };
    if (yScales && afterYScaleFit) {
      for (const key of Object.keys(yScales)) {
        yScales[key].afterFit = afterYScaleFit;
      }
    }
    return (
      <Bar
        ref={ref}
        data={{
          datasets: datasets as ChartDataset<'bar', CO2ChartData[]>[],
        }}
        options={{
          animation: {
            onComplete,
          },
          maintainAspectRatio: false,
          datasets: {
            bar: {
              maxBarThickness: 30,
            },
            line: {
              tension: 0.2,
              borderWidth: 2,
              pointHoverBackgroundColor: colors.white,
            },
          },
          plugins: {
            zoom: {
              limits: {
                x: {
                  min: xScaleLimitMin || 'original',
                  max: xScaleLimitMax || 'original',
                },
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: 'x',
                onZoomComplete: ({ chart }) => {
                  const { min, max } = chart.scales.x;
                  if (onXScaleUpdate) {
                    onXScaleUpdate(min, max);
                  }
                  if (onZoomUpdate) {
                    const zoomLevel = chart.getZoomLevel();
                    onZoomUpdate(zoomLevel);
                  }
                },
              },
              pan: {
                enabled: true,
                mode: 'x',
                onPanComplete: ({ chart }) => {
                  const { min, max } = chart.scales.x;
                  if (onXScaleUpdate) {
                    onXScaleUpdate(min, max);
                  }
                },
              },
            },
            legend: {
              display: false,
            },
            tooltip: {
              mode: 'x',
              enabled: false,
              external: externalTooltipHandler,
              position: 'nearest',
              filter: (e) => {
                return (e.raw as CO2ChartData).y !== null;
              },
              callbacks: {
                afterLabel(tooltipItems) {
                  const label = tooltipItems.dataset.label || '';
                  const start = label.indexOf('(');
                  const end = label.indexOf(')');

                  if (start !== -1 && end !== -1) {
                    return label.slice(start + 1, end);
                  }
                  return 'Te';
                },
              },
            },
          },
          scales: {
            x: {
              ticks: {
                ...ticks,
              },
              min: xScaleLimitMin,
              max: xScaleLimitMax,
              grid: {
                color: colors.gray[4],
              },
              type: 'time',
              time: {
                unit: xScaleTimeUnit,
                minUnit: 'hour',
                tooltipFormat: DATE_FORMAT_SHORT,
                displayFormats: {
                  day: DATE_FORMAT_SHORT,
                  hour: TIME_FORMAT_SHORT,
                },
              },
              adapters: {
                date: {
                  locale: enUS,
                },
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                color: colors.gray[4],
              },
              afterFit: afterYScaleFit,
              ticks: {
                ...ticks,
              },
            },
            ...yScales,
          },
        }}
      />
    );
  },
);

export default memo(CO2Chart);
