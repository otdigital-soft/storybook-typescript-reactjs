import { useParams } from 'react-router-dom';
import { WellPlanStep } from 'pages/WellPlan/consts';
import useWellPlan from 'pages/WellPlan/hooks/useWellPlan';

const useCurrentWellPlan = () => {
  const { wellPlanId, stepId } =
    useParams<{ stepId: WellPlanStep; wellPlanId: string }>();
  const wellPlan = useWellPlan(Number(wellPlanId));

  return {
    ...wellPlan,
    stepId,
    wellPlanId: Number(wellPlanId),
  };
};

export default useCurrentWellPlan;
