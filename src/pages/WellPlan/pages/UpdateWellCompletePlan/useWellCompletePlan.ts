import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellPlanOptions from 'pages/WellPlan/hooks/useWellPlanOptions';

const useWellCompletePlan = () => {
  const { error: wellPlanError, isLoading: isLoadingWellPlan } =
    useCurrentWellPlan();
  const { error: wellPlanOptionsError, isLoading: isLoadingWellPlanOptions } =
    useWellPlanOptions();

  return {
    isLoading: isLoadingWellPlan || isLoadingWellPlanOptions,
    error: wellPlanError || wellPlanOptionsError,
  };
};

export default useWellCompletePlan;
