import AssetDetailsForm from 'pages/Assets/containers/AssetDetailsForm';
import { Formik } from 'formik';
import useUpdateAsset from 'pages/Assets/pages/UpdateAsset/hooks/useUpdateAsset';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useAsset from 'pages/Assets/pages/UpdateAsset/hooks/useAsset';
import useActiveBaselineId from 'pages/Assets/pages/UpdateAsset/hooks/useActiveBaselineId';
import AssetDetailsStatusMonitor from 'pages/Assets/pages/UpdateAsset/containers/AssetDetailsStatusMonitor';

const AssetDetails = () => {
  const assetId = useAssetId();
  const { data: assetData } = useAsset(assetId);
  const activeBaseline = useActiveBaselineId();
  const { initialValues, onSubmit, validationSchema } = useUpdateAsset(
    assetId,
    assetData,
  );

  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={(values, formikHelpers) =>
        onSubmit({
          values,
          formikHelpers,
        })
      }
      initialValues={initialValues}
    >
      <>
        <AssetDetailsStatusMonitor />
        <AssetDetailsForm
          disabledFields={{
            draft: !activeBaseline,
          }}
        />
      </>
    </Formik>
  );
};

export default AssetDetails;
