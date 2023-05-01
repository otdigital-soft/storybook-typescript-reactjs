import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellCompletePlanSummary from 'pages/WellPlan/hooks/useWellCompletePlanSummary';
import useWellPlannedPlanSummary from 'pages/WellPlan/hooks/useWellPlannedPlanSummary';
import useWellCompletePlanCommonCO2Data from 'pages/WellPlan/pages/WellPlanReporting/useWellCompletePlanCommonCO2Data';
import useWellPlannerEmissionReductionInitiatives from 'pages/WellPlan/hooks/useWellPlannerEmissionReductionInitiatives';

const useWellPlanReport = () => {
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
  const {
    isLoading: isLoadingWellCompletePlanCO2Data,
    error: wellCompletePlanCO2DataError,
  } = useWellCompletePlanCommonCO2Data();

  return {
    isLoading:
      isLoadingEmissionReductionInitiatives ||
      isLoadingWellPlan ||
      isLoadingWellPlannedPlanSummary ||
      isLoadingWellCompletePlanSummary ||
      isLoadingWellCompletePlanCO2Data,
    error:
      emissionReductionInitiativesError ||
      wellPlanError ||
      wellPlannedPlanSummaryError ||
      wellCompletePlanSummaryError ||
      wellCompletePlanCO2DataError,
  };
};

export default useWellPlanReport;
