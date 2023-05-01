import useWellReportCO2ChartData from './useWellReportCO2ChartData';
import Box from 'components/Box';
import { useReport } from 'pages/WellPlan/containers/ReportProvider';
import { Spin } from 'antd';
import Center from 'components/Center';
import ZoomableCO2Chart from 'pages/WellPlan/components/ZoomableCO2Chart';
import useChartZoom from 'pages/WellPlan/hooks/useChartZoom';
import { useCallback } from 'react';

const WellReportCO2Chart = () => {
  const { xScaleTimeUnit, xScaleDate } = useChartZoom();
  const { datasets, isLoading, isRefetching, scales } =
    useWellReportCO2ChartData(
      xScaleTimeUnit === 'day'
        ? undefined
        : {
            start: xScaleDate?.min,
            end: xScaleDate?.max,
          },
    );
  const dispatchReport = useReport();
  const onComplete = useCallback(() => {
    dispatchReport({
      type: 'completedChart',
      chart: 'co2',
    });
  }, [dispatchReport]);

  if (xScaleTimeUnit === 'day' && (isLoading || isRefetching)) {
    return (
      <Center height={300}>
        <Spin />
      </Center>
    );
  }

  return (
    <Box height={300}>
      <ZoomableCO2Chart
        datasets={
          xScaleTimeUnit === 'hour' && (isLoading || isRefetching)
            ? []
            : datasets
        }
        yScales={scales}
        onComplete={onComplete}
      />
    </Box>
  );
};

export default WellReportCO2Chart;
