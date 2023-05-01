import { useParams } from 'react-router-dom';

const useAssetId = () => {
  const { assetId } = useParams<{ assetId: string }>();
  return Number(assetId);
};

export default useAssetId;
