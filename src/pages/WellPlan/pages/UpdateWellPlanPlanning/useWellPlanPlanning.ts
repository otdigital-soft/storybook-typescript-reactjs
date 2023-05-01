import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellPlanOptions from 'pages/WellPlan/hooks/useWellPlanOptions';
import useWellPlannedPlanSummary from 'pages/WellPlan/hooks/useWellPlannedPlanSummary';

const useWellPlanPlanning = () => {
  const {
    wellPlanId,
    error: wellPlanError,
    isLoading: isLoadingWellPlan,
  } = useCurrentWellPlan();
  const { error: wellPlanOptionsError, isLoading: isLoadingWellPlanOptions } =
    useWellPlanOptions();
  const {
    isLoading: isLoadingWellPlannedPlanSummary,
    error: wellPlannedPlanSummaryError,
  } = useWellPlannedPlanSummary(wellPlanId);

  return {
    isLoading:
      isLoadingWellPlan ||
      isLoadingWellPlanOptions ||
      isLoadingWellPlannedPlanSummary,
    error: wellPlanError || wellPlanOptionsError || wellPlannedPlanSummaryError,
  };
};

export default useWellPlanPlanning;
