import { CurrentStepEnum } from 'api/schema';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';

const useCanEdit = (step: CurrentStepEnum) => {
  const { data: currentWellPlanData } = useCurrentWellPlan();
  return currentWellPlanData?.current_step === step;
};

export default useCanEdit;
