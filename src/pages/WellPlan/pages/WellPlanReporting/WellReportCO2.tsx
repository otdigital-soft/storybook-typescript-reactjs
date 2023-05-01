import useChartYScale from 'pages/WellPlan/hooks/useChartYScale';
import Box, { Flexbox } from 'components/Box';
import { Text, Title } from 'components/Typography';
import WellReportCO2ChartFilters from './WellReportCO2ChartFilters';
import WellReportCO2Chart from './WellReportCO2Chart';
import { sumValues } from 'utils/math';
import { CustomScales } from 'pages/WellPlan/pages/WellPlanReporting/consts';
import { notEmpty } from 'utils/data';
import WellReportPhasesTimeline from './WellReportPhasesTimeline';
import ChartZoomProvider from 'pages/WellPlan/containers/ChartZoomProvider';
import parseISO from 'date-fns/parseISO';
import addHours from 'date-fns/addHours';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import { useMemo } from 'react';

const WellReportCO2 = () => {
  const { yScalesWidths } = useChartYScale();
  const marginLeft = yScalesWidths['y'] || 0;
  const { data: wellPlanData } = useCurrentWellPlan();
  const marginRight = sumValues(
    [
      yScalesWidths[CustomScales.Cumulative],
      yScalesWidths[CustomScales.Temperature],
      yScalesWidths[CustomScales.WindSpeed],
      yScalesWidths[CustomScales.WaveHeight],
    ].filter(notEmpty),
  );
  const { startDate, endDate } = useMemo(() => {
    const totalMeasuredDuration = sumValues(
      (wellPlanData?.complete_steps || []).map((step) => step.duration),
    );
    const totalPlannedDuration = sumValues(
      (wellPlanData?.planned_steps || []).map((step) => step.improved_duration),
    );
    const plannedStartDate = parseISO(
      wellPlanData?.planned_start_date as string,
    );
    const plannedEndDate = addHours(
      plannedStartDate,
      Math.ceil(totalPlannedDuration * 24),
    );
    const actualStartDate = parseISO(wellPlanData?.actual_start_date as string);
    const actualEndDate = addHours(
      actualStartDate,
      Math.ceil(totalMeasuredDuration * 24),
    );

    return {
      startDate:
        plannedStartDate < actualStartDate ? plannedStartDate : actualStartDate,
      endDate: plannedEndDate > actualEndDate ? plannedEndDate : actualEndDate,
    };
  }, [wellPlanData]);

  return (
    <>
      <Flexbox justifyContent="space-between" marginLeft={marginLeft}>
        <Box>
          <Title level={5} color="graphite.2">
            CO<sub>2</sub> Te
          </Title>
          <Box marginTop={1}>
            <Text
              fontSize={10}
              lineHeight="20px"
              color="graphite.8"
              display="inline-block"
            >
              CO<sub>2</sub> baseline versus target emissions
            </Text>
          </Box>
        </Box>
      </Flexbox>
      <Box marginTop={20}>
        <Box marginLeft={marginLeft ? marginLeft - 8 : 0}>
          <WellReportCO2ChartFilters />
        </Box>
        <Box marginTop={1}>
          <ChartZoomProvider startDate={startDate} endDate={endDate}>
            <WellReportCO2Chart />
          </ChartZoomProvider>
        </Box>
        <Box marginLeft={marginLeft} marginRight={marginRight}>
          <WellReportPhasesTimeline />
        </Box>
      </Box>
    </>
  );
};

export default WellReportCO2;
