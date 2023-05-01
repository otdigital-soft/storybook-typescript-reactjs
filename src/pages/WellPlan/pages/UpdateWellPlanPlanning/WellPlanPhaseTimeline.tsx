import PhaseTimeline, { Phase } from 'pages/WellPlan/components/PhaseTimeline';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellPlannerPhases from 'pages/WellPlan/hooks/useWellPlannerPhases';
import { calculatePhaseDuration } from 'pages/WellPlan/utils/timeline';
import { useTheme } from 'styled-components';
import { groupByKey } from 'utils/data';
import useWellPlanCommonCO2Data, { PhaseId } from './useWellPlanCommonCO2Data';

export const decodePhase = (encodedPhase: PhaseId) => {
  const [phaseId, stepId] = encodedPhase.split('/');
  return {
    id: Number(stepId),
    phase: {
      id: phaseId,
    },
  };
};

const WellPlanPhaseTimeline = () => {
  const { colors } = useTheme();
  const { commonCO2Data } = useWellPlanCommonCO2Data();
  const { wellPlanId } = useCurrentWellPlan();
  const { phaseIdMap } = useWellPlannerPhases(wellPlanId);
  const groupedPhases = groupByKey(commonCO2Data, 'phaseId');
  const phases = Object.entries(groupedPhases).map(([, data], index, array) => {
    const phaseId = decodePhase(data[0].phaseId).phase.id;

    return {
      name: data[0].phase.name,
      mode: data[0].mode?.name,
      lineColor: phaseIdMap[phaseId]?.color || colors.sand[1],
      circleColor:
        index + 1 === array.length ? colors.turquoise[1] : colors.gray['15'],
      duration: calculatePhaseDuration(data, commonCO2Data),
    } as Phase;
  });

  return <PhaseTimeline phases={phases} />;
};

export default WellPlanPhaseTimeline;
