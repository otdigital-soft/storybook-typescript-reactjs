import Box, { Flexbox } from 'components/Box';
import { Text, Title } from 'components/Typography';
import WellPlanCO2ChartFilters from './WellPlanCO2ChartFilters';
import WellPlanCO2Stats from './WellPlanCO2Stats';
import WellPlanCO2Chart from './WellPlanCO2Chart';
import WellPlanPhaseTimeline from './WellPlanPhaseTimeline';
import useChartYScale from 'pages/WellPlan/hooks/useChartYScale';
import ChartZoomProvider from 'pages/WellPlan/containers/ChartZoomProvider';
import parseISO from 'date-fns/parseISO';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import { sumValues } from 'utils/math';
import addHours from 'date-fns/addHours';
import { useMemo } from 'react';

const WellPlanCO2 = () => {
  const { yScalesWidths } = useChartYScale();
  const marginLeft = yScalesWidths['y'] || 0;
  const { data: wellPlanData } = useCurrentWellPlan();

  const { startDate, endDate } = useMemo(() => {
    const totalPlannedDuration = sumValues(
      (wellPlanData?.planned_steps || []).map((step) => step.duration),
    );
    const plannedStartDate = parseISO(
      wellPlanData?.planned_start_date as string,
    );
    const plannedEndDate = addHours(
      plannedStartDate,
      Math.ceil(totalPlannedDuration * 24),
    );

    return {
      startDate: plannedStartDate,
      endDate: plannedEndDate,
    };
  }, [wellPlanData?.planned_start_date, wellPlanData?.planned_steps]);

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
        <Box marginTop={1}>
          <WellPlanCO2Stats />
        </Box>
      </Flexbox>
      <Box marginTop={20}>
        <Box marginLeft={marginLeft ? marginLeft - 8 : 0}>
          <WellPlanCO2ChartFilters />
        </Box>
        <Box marginTop={1}>
          <ChartZoomProvider startDate={startDate} endDate={endDate}>
            <WellPlanCO2Chart />
          </ChartZoomProvider>
        </Box>
        <Box marginTop={7} marginLeft={marginLeft}>
          <WellPlanPhaseTimeline />
        </Box>
      </Box>
    </>
  );
};

export default WellPlanCO2;
