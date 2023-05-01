import { useFormikContext } from 'formik';
import { FormValues } from 'pages/Assets/containers/AssetDetailsForm';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useAsset from 'pages/Assets/pages/UpdateAsset/hooks/useAsset';
import { useEffect } from 'react';

const AssetDetailsStatusMonitor = () => {
  const { setFieldValue } = useFormikContext<FormValues>();
  const assetId = useAssetId();
  const { data: assetData } = useAsset(assetId);
  useEffect(() => {
    if (assetData?.draft) {
      setFieldValue('draft', Number(true));
    }
  }, [assetData?.draft, setFieldValue]);
  return null;
};

export default AssetDetailsStatusMonitor;
