import useAssetId from 'pages/Assets/hooks/useAssetId';
import useAsset from 'pages/Assets/pages/UpdateAsset/hooks/useAsset';
import { useMemo } from 'react';

const useActiveBaselineId = () => {
  const assetId = useAssetId();
  const { data: assetData } = useAsset(assetId);
  return useMemo(
    () => assetData?.baselines?.find((baseline) => baseline.active)?.id,
    [assetData?.baselines],
  );
};

export default useActiveBaselineId;
