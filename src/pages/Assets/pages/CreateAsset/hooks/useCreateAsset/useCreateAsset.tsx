import { FormValues, schema } from 'pages/Assets/containers/AssetDetailsForm';
import { useMutation } from 'react-query';
import { FormikHelpers } from 'formik';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import { AssetDetails, AssetTypeEnum, TenantsService } from 'api/schema';
import useUpdateAssetDetailsCache from 'pages/Assets/hooks/useUpdateAssetDetailsCache';

const useCreateAsset = () => {
  const initialValues: FormValues = {
    name: '',
    type: null,
    draft: Number(true),
    design_description: '',
    green_house_gas_class_notation: '',
    external_energy_supply: {
      type: '',
      nox: null,
      capacity: null,
      generator_efficiency_factor: null,
      co2: null,
    },
  };
  const { tenantId } = useTenant();
  const navigate = useNavigate();
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
      const { data } = await TenantsService.tenantsEmissionsAssetsCreateCreate(
        Number(tenantId),
        {
          name: values.name,
          green_house_gas_class_notation: values.green_house_gas_class_notation,
          design_description: values.design_description,
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
          message: 'New asset',
          description: (
            <>
              New asset "<strong>{data.name}</strong>" has been created.
            </>
          ),
        });
        await updateAssetDetailsCache(data.id, data);
        navigate(
          generatePath(routes.updateAsset, {
            assetId: String(data.id),
          }),
        );
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save the asset. Please try later.',
        );

        Logger.warn('Unable to create the asset.', error, values);
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

export default useCreateAsset;
