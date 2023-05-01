import useCurrentWellPlan from '../useCurrentWellPlan';

const useCurrentAssetId = () => {
  const { data: currentWellPlanData } = useCurrentWellPlan();

  return currentWellPlanData?.asset.id;
};

export default useCurrentAssetId;
