import useAllHelicopterTypes from 'pages/Assets/hooks/useAllHelicopterTypes';
import useAllVesselTypes from 'pages/Assets/hooks/useAllVesselTypes';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useWellPlannerEmissionReductionInitiatives from 'pages/WellPlan/hooks/useWellPlannerEmissionReductionInitiatives';
import useWellPlannerModes from 'pages/WellPlan/hooks/useWellPlannerModes';
import useWellPlannerPhases from 'pages/WellPlan/hooks/useWellPlannerPhases';

const useWellPlanOptions = () => {
  const { wellPlanId } = useCurrentWellPlan();
  const {
    data: emissionReductionInitiativesData,
    error: emissionReductionInitiativesError,
    isLoading: isLoadingEmissionReductionInitiatives,
  } = useWellPlannerEmissionReductionInitiatives(wellPlanId);
  const {
    data: vesselTypesData,
    error: vesselTypesError,
    isLoading: isLoadingVesselTypes,
  } = useAllVesselTypes();
  const {
    data: helicopterTypesData,
    error: helicopterTypesError,
    isLoading: isLoadingHelicopterTypes,
  } = useAllHelicopterTypes();
  const {
    data: phasesData,
    error: phasesError,
    isLoading: isLoadingPhases,
  } = useWellPlannerPhases(wellPlanId);
  const {
    data: modesData,
    error: modesError,
    isLoading: isLoadingModes,
  } = useWellPlannerModes(wellPlanId);

  return {
    emissionReductionInitiativesData,
    vesselTypesData,
    helicopterTypesData,
    phasesData,
    modesData,
    isLoading:
      isLoadingEmissionReductionInitiatives ||
      isLoadingVesselTypes ||
      isLoadingHelicopterTypes ||
      isLoadingPhases ||
      isLoadingModes,
    error:
      emissionReductionInitiativesError ||
      vesselTypesError ||
      helicopterTypesError ||
      phasesError ||
      modesError,
  };
};

export default useWellPlanOptions;
