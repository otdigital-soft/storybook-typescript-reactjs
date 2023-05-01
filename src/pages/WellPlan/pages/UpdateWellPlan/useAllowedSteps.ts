import {
  CurrentStepToWellPlanStepMap,
  WellPlanStep,
} from 'pages/WellPlan/consts';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';

const useAllowedSteps = () => {
  const { data: wellPlanData } = useCurrentWellPlan();
  const currentStep = wellPlanData?.current_step
    ? CurrentStepToWellPlanStepMap[wellPlanData.current_step]
    : undefined;
  if (!currentStep) {
    return [];
  }
  switch (currentStep) {
    case WellPlanStep.Details:
      return [WellPlanStep.Details];
    case WellPlanStep.Planning:
      return [WellPlanStep.Details, WellPlanStep.Planning];
    case WellPlanStep.Complete:
      return [
        WellPlanStep.Details,
        WellPlanStep.Planning,
        WellPlanStep.Complete,
      ];
    case WellPlanStep.Analysis:
      return [
        WellPlanStep.Details,
        WellPlanStep.Planning,
        WellPlanStep.Complete,
        WellPlanStep.Analysis,
      ];
  }
};

export default useAllowedSteps;
