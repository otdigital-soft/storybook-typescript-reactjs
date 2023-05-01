import Box, { Flexbox } from 'components/Box';
import { Text, Title } from 'components/Typography';
import { ArrowDownOutlined } from '@ant-design/icons';
import useWellPlannedPlanSummary from 'pages/WellPlan/hooks/useWellPlannedPlanSummary';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import { prettyNumber, roundNumber } from 'utils/format';

const WellPlanCO2Stats = () => {
  const { wellPlanId } = useCurrentWellPlan();
  const { data: wellPlannedPlanSummaryData } =
    useWellPlannedPlanSummary(wellPlanId);
  const totalBaseline = wellPlannedPlanSummaryData?.total_baseline || 0;
  const totalTarget = wellPlannedPlanSummaryData?.total_target || 0;

  return (
    <Flexbox gap={40}>
      <Flexbox flexDirection="column" alignItems="flex-end">
        <Text display="inline-block" type="secondary">
          Calculated baseline
        </Text>
        <Box marginTop={4}>
          <Title level={3} fontWeight={400}>
            {prettyNumber(roundNumber(totalBaseline, 2))} CO
            <sub>2</sub> Te
          </Title>
        </Box>
      </Flexbox>
      <Flexbox flexDirection="column" alignItems="flex-end">
        <Text display="inline-block" type="secondary">
          Calculated target
        </Text>
        <Flexbox marginTop={4} gap={4} alignItems="center">
          {totalTarget < totalBaseline ? (
            <Text fontSize={24} lineHeight={1}>
              <ArrowDownOutlined />
            </Text>
          ) : null}
          <Title level={3} fontWeight={400}>
            {prettyNumber(roundNumber(totalTarget, 2))} CO
            <sub>2</sub> Te
          </Title>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
};

export default WellPlanCO2Stats;
