import useWellPlanCO2ChartData from './useWellPlanCO2ChartData';
import Box from 'components/Box';
import Center from 'components/Center';
import { Spin } from 'antd';
import ZoomableCO2Chart from 'pages/WellPlan/components/ZoomableCO2Chart';
import useChartZoom from 'pages/WellPlan/hooks/useChartZoom';

const WellPlanCO2Chart = () => {
  const { xScaleTimeUnit, xScaleDate } = useChartZoom();
  const { datasets, isLoading, isRefetching } = useWellPlanCO2ChartData(
    xScaleTimeUnit === 'day'
      ? undefined
      : {
          start: xScaleDate?.min,
          end: xScaleDate?.max,
        },
  );

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
      />
    </Box>
  );
};

export default WellPlanCO2Chart;
