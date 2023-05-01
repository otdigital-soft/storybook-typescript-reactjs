import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { ArcElement, Chart } from 'chart.js';
import Box, { Flexbox } from 'components/Box';
import { Text } from 'components/Typography';
import useBreakpointValue from 'hooks/useBreakpointValue';
import { useReport } from 'pages/WellPlan/containers/ReportProvider';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellCompletePlanSummary from 'pages/WellPlan/hooks/useWellCompletePlanSummary';
import useWellPlannedPlanSummary from 'pages/WellPlan/hooks/useWellPlannedPlanSummary';
import { useTheme } from 'styled-components';
import { prettyNumber, roundNumber } from 'utils/format';
import WellReportSummaryChart from './WellReportSummaryChart';
import WellReportSummaryHeader from './WellReportSummaryHeader';

Chart.register(ArcElement);

const WellReportSummary = () => {
  const { wellPlanId } = useCurrentWellPlan();
  const { data: wellPlannedPlanSummaryData } =
    useWellPlannedPlanSummary(wellPlanId);
  const { data: wellCompletePlanSummaryData } =
    useWellCompletePlanSummary(wellPlanId);
  const { colors } = useTheme();
  const plannedBaseline = wellPlannedPlanSummaryData?.total_baseline || 0;
  const plannedTarget = wellPlannedPlanSummaryData?.total_target || 0;
  const plannedDuration =
    wellPlannedPlanSummaryData?.total_improved_duration || 0;
  const completeBaseline = wellCompletePlanSummaryData?.total_baseline || 0;
  const completeTarget = wellCompletePlanSummaryData?.total_target || 0;
  const completeDuration = wellCompletePlanSummaryData?.total_duration || 0;
  const totalSavings = completeTarget - plannedTarget;
  const gapValue = useBreakpointValue({
    xxl: 115,
    xl: 40,
    lg: 12,
  });
  const chartSize = useBreakpointValue({
    xxl: 244,
    xl: 200,
    lg: 160,
  });
  const dispatchReport = useReport();
  return (
    <Flexbox justifyContent="space-between" gap={30}>
      <Flexbox gap={gapValue} minWidth={0}>
        <Box>
          <WellReportSummaryHeader
            header="Baseline"
            value={plannedBaseline}
            unit={
              <>
                C0<sub>2</sub> (Te)
              </>
            }
          />
          <Box width={chartSize} marginTop={19}>
            <WellReportSummaryChart
              data={[completeBaseline, plannedBaseline]}
              labels={['Measured', 'Baseline']}
              backgroundColor={[colors.magenta['8'], colors.gray['4']]}
              onComplete={() => {
                dispatchReport({
                  type: 'completedChart',
                  chart: 'baseline',
                });
              }}
            />
          </Box>
        </Box>
        <Box>
          <WellReportSummaryHeader
            header="Target"
            value={plannedTarget}
            unit={
              <>
                C0<sub>2</sub> (Te)
              </>
            }
          />
          <Box width={chartSize} marginTop={19}>
            <WellReportSummaryChart
              data={[completeTarget, plannedTarget]}
              labels={['Measured', 'Target']}
              backgroundColor={[colors.magenta['8'], colors.gray['4']]}
              onComplete={() => {
                dispatchReport({
                  type: 'completedChart',
                  chart: 'target',
                });
              }}
            />
          </Box>
        </Box>
        <Box>
          <WellReportSummaryHeader
            header="Timeline"
            value={plannedDuration}
            unit="days"
          />
          <Box width={chartSize} marginTop={19}>
            <WellReportSummaryChart
              data={[completeDuration, plannedDuration]}
              labels={['Measured', 'Planned']}
              backgroundColor={[colors.magenta['8'], colors.gray['4']]}
              onComplete={() => {
                dispatchReport({
                  type: 'completedChart',
                  chart: 'timeline',
                });
              }}
            />
          </Box>
        </Box>
      </Flexbox>

      <Box minWidth={0}>
        <Flexbox alignItems="flex-end" flexDirection="column">
          <Text fontSize={18} lineHeight={1.33}>
            Estimated total savings (CO<sub>2</sub> Te)
          </Text>
          <Flexbox marginTop={21} marginBottom={22} width="100%">
            <Text
              fontSize={64}
              lineHeight={1}
              fontWeight={600}
              display="flex"
              width="100%"
              style={{
                justifyContent: 'flex-end',
              }}
            >
              {totalSavings < 0 ? <ArrowDownOutlined /> : null}
              {totalSavings > 0 ? <ArrowUpOutlined /> : null}
              <Text
                ellipsis
                style={{
                  marginLeft: totalSavings !== 0 ? 10 : 0,
                }}
              >
                {prettyNumber(roundNumber(totalSavings, 2))}
              </Text>
            </Text>
          </Flexbox>
          <Text type="secondary" fontSize={10} lineHeight={2}>
            When measured against the target
          </Text>
        </Flexbox>
      </Box>
    </Flexbox>
  );
};

export default WellReportSummary;
