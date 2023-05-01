import useWellPlanOptions from 'pages/WellPlan/hooks/useWellPlanOptions';
import { DefaultOptionType } from 'rc-select/lib/Select';
import { mapDataToOptions } from 'pages/WellPlan/utils/options';

const useWellPhaseFormOptions = () => {
  const { phasesData, modesData } = useWellPlanOptions();
  const phaseOptions: DefaultOptionType[] = (phasesData || []).map(
    mapDataToOptions,
  );
  const modeOptions: DefaultOptionType[] = (modesData || []).map(
    mapDataToOptions,
  );

  return {
    phaseOptions,
    modeOptions,
  };
};

export default useWellPhaseFormOptions;
