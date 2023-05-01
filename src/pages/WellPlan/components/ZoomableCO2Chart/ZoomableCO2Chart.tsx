import { Scale } from 'chart.js';
import { useCallback, useEffect, useRef } from 'react';
import 'chartjs-adapter-date-fns';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import CO2Chart, { CO2ChartData } from 'pages/WellPlan/components/CO2Chart';
import useChartZoom from 'pages/WellPlan/hooks/useChartZoom';
import { CO2ChartProps } from '../CO2Chart';
import useChartYScale from 'pages/WellPlan/hooks/useChartYScale';
import useRefState from 'hooks/useRefState';

const ZoomableCO2Chart = ({
  datasets,
  onComplete,
  yScales,
}: Pick<CO2ChartProps, 'datasets' | 'onComplete' | 'yScales'>) => {
  const { xScaleLimit, onXScaleUpdate, xScale, xScaleTimeUnit, setZoomLevel } =
    useChartZoom();
  const chartRef = useRef<ChartJSOrUndefined<'bar', CO2ChartData[]>>();
  const chartRefCallback = useCallback((node) => {
    chartRef.current = node;
  }, []);
  const xScaleMin = useRefState(xScale?.min);
  const xScaleMax = useRefState(xScale?.max);

  const { setYScale } = useChartYScale();
  const afterYScaleFit = useCallback(
    (scale: Scale) => {
      setYScale(scale);
    },
    [setYScale],
  );

  useEffect(() => {
    if (
      xScaleMin.current !== undefined &&
      xScaleMax.current !== undefined &&
      chartRef.current
    ) {
      chartRef.current.stop();
      chartRef.current.zoomScale('x', {
        min: xScaleMin.current,
        max: xScaleMax.current,
      });
    }
  }, [
    onComplete,
    datasets,
    afterYScaleFit,
    xScaleLimit?.max,
    xScaleLimit?.min,
    onXScaleUpdate,
    setZoomLevel,
    xScaleTimeUnit,
    xScaleMin,
    xScaleMax,
    yScales,
  ]);

  return (
    <CO2Chart
      ref={chartRefCallback}
      yScales={yScales}
      afterYScaleFit={afterYScaleFit}
      datasets={datasets}
      onComplete={onComplete}
      xScaleLimitMax={xScaleLimit?.max}
      xScaleLimitMin={xScaleLimit?.min}
      onXScaleUpdate={onXScaleUpdate}
      onZoomUpdate={setZoomLevel}
      xScaleTimeUnit={xScaleTimeUnit}
    />
  );
};

export default ZoomableCO2Chart;
