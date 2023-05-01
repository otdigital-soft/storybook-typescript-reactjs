import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellCompletePlanSummary from 'pages/WellPlan/hooks/useWellCompletePlanSummary';
import useWellPlannedPlanSummary from 'pages/WellPlan/hooks/useWellPlannedPlanSummary';
import useWellPlannerEmissionReductionInitiatives from 'pages/WellPlan/hooks/useWellPlannerEmissionReductionInitiatives';

const useWellPlanReporting = () => {
  const {
    wellPlanId,
    error: wellPlanError,
    isLoading: isLoadingWellPlan,
  } = useCurrentWellPlan();
  const {
    isLoading: isLoadingWellPlannedPlanSummary,
    error: wellPlannedPlanSummaryError,
  } = useWellPlannedPlanSummary(wellPlanId);
  const {
    isLoading: isLoadingWellCompletePlanSummary,
    error: wellCompletePlanSummaryError,
  } = useWellCompletePlanSummary(wellPlanId);
  const {
    error: emissionReductionInitiativesError,
    isLoading: isLoadingEmissionReductionInitiatives,
  } = useWellPlannerEmissionReductionInitiatives(wellPlanId);

  return {
    isLoading:
      isLoadingWellPlan ||
      isLoadingWellPlannedPlanSummary ||
      isLoadingWellCompletePlanSummary ||
      isLoadingEmissionReductionInitiatives,
    error:
      wellPlanError ||
      wellPlannedPlanSummaryError ||
      wellCompletePlanSummaryError ||
      emissionReductionInitiativesError,
  };
};

export default useWellPlanReporting;
