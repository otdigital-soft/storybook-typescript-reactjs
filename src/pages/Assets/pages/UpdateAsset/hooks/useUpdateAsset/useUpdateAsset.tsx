import { FormValues, schema } from 'pages/Assets/containers/AssetDetailsForm';
import { useMutation } from 'react-query';
import { FormikHelpers } from 'formik';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import { AssetDetails, AssetTypeEnum, TenantsService } from 'api/schema';
import useUpdateAssetDetailsCache from 'pages/Assets/hooks/useUpdateAssetDetailsCache';

const useUpdateAsset = (
  assetId: number,
  assetData: AssetDetails | undefined,
) => {
  const initialValues: FormValues = {
    name: assetData?.name || '',
    type: assetData?.type || null,
    draft: Number(assetData?.draft ?? true),
    design_description: assetData?.design_description || '',
    green_house_gas_class_notation:
      assetData?.green_house_gas_class_notation || '',
    external_energy_supply: {
      type: assetData?.external_energy_supply.type || '',
      nox: assetData?.external_energy_supply.nox ?? null,
      capacity: assetData?.external_energy_supply.capacity ?? null,
      generator_efficiency_factor:
        assetData?.external_energy_supply.generator_efficiency_factor ?? null,
      co2: assetData?.external_energy_supply.co2 ?? null,
    },
  };
  const { tenantId } = useTenant();
  const updateAssetDetailsCache = useUpdateAssetDetailsCache();
  const { mutateAsync: onSubmit } = useMutation<
    AssetDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } = await TenantsService.tenantsEmissionsAssetsUpdateUpdate(
        assetId,
        Number(tenantId),
        {
          name: values.name,
          design_description: values.design_description,
          green_house_gas_class_notation: values.green_house_gas_class_notation,
          draft: !!values.draft,
          type: values.type as AssetTypeEnum,
          external_energy_supply: {
            type: values.external_energy_supply.type,
            co2: Number(values.external_energy_supply.co2),
            nox: Number(values.external_energy_supply.nox),
            capacity: Number(values.external_energy_supply.capacity),
            generator_efficiency_factor: Number(
              values.external_energy_supply.generator_efficiency_factor,
            ),
          },
        },
      );
      return data;
    },
    {
      onSuccess: async (data) => {
        notification.success({
          message: 'Updated asset',
          description: (
            <>
              Asset "<strong>{data.name}</strong>" has been updated.
            </>
          ),
        });
        await updateAssetDetailsCache(assetId, data);
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save the asset. Please try later.',
        );

        Logger.warn(
          `Unable to update the Asset(id=${assetId}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );

  return {
    initialValues,
    onSubmit,
    validationSchema: schema,
  };
};

export default useUpdateAsset;
