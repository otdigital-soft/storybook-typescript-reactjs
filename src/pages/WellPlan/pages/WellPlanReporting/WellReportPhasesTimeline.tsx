import Box from 'components/Box';
import { Text } from 'components/Typography';
import PhaseTimeline, { Phase } from 'pages/WellPlan/components/PhaseTimeline';
import { calculatePhaseDuration } from 'pages/WellPlan/utils/timeline';
import { useTheme } from 'styled-components';
import { groupByKey } from 'utils/data';
import useWellCompletePlanCommonCO2Data, {
  CommonCO2Data,
} from './useWellCompletePlanCommonCO2Data';

const preparePhase = ({
  phaseData,
  totalData,
  defaultColor,
}: {
  phaseData: CommonCO2Data[];
  totalData: CommonCO2Data[];
  defaultColor: string;
}): Omit<Phase, 'circleColor'> => {
  return {
    name: phaseData[0].phase.name,
    mode: phaseData[0].mode?.name,
    lineColor: phaseData[0].phase.color || defaultColor,
    duration: calculatePhaseDuration(phaseData, totalData),
  };
};

const WellReportPhasesTimeline = () => {
  const { colors } = useTheme();
  const { completePlanCO2Data, plannedPlanCO2Data, commonDays } =
    useWellCompletePlanCommonCO2Data();
  const completePlanGroupedPhases = groupByKey(completePlanCO2Data, 'phaseId');
  const plannedPlanGroupedPhases = groupByKey(plannedPlanCO2Data, 'phaseId');
  const completePhases = Object.entries(completePlanGroupedPhases).map(
    ([, phaseData], index, array) => {
      return {
        circleColor:
          index + 1 === array.length ? colors.turquoise[1] : colors.gray[15],
        ...preparePhase({
          phaseData: phaseData,
          totalData: completePlanCO2Data,
          defaultColor: colors.sand[1],
        }),
      };
    },
  );
  const plannedPhases = Object.entries(plannedPlanGroupedPhases).map(
    ([, phaseData], index, array) => {
      return {
        circleColor:
          index + 1 === array.length ? colors.turquoise[1] : colors.gray[15],
        ...preparePhase({
          phaseData: phaseData,
          totalData: plannedPlanCO2Data,
          defaultColor: colors.sand[1],
        }),
      };
    },
  );
  const totalDuration = commonDays.length;
  const completePlanDuration =
    ([...new Set(completePlanCO2Data.map((data) => data.date))].length /
      totalDuration) *
    100;
  const plannedPlanDuration =
    ([...new Set(plannedPlanCO2Data.map((data) => data.date))].length /
      totalDuration) *
    100;

  return (
    <>
      <Box marginTop={12}>
        <Text fontSize={12} lineHeight={1.66} strong>
          Target
        </Text>
        <Box marginTop={10} width={`${plannedPlanDuration}%`}>
          <PhaseTimeline phases={plannedPhases} />
        </Box>
      </Box>
      <Box marginTop={12}>
        <Text fontSize={12} lineHeight={1.66} strong>
          Measured
        </Text>
        <Box marginTop={10} width={`${completePlanDuration}%`}>
          <PhaseTimeline phases={completePhases} />
        </Box>
      </Box>
    </>
  );
};

export default WellReportPhasesTimeline;
