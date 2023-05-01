import { AssetMode, TenantsService } from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import {
  FormValues,
  schema,
  getInitialValues,
} from '../../containers/ModeForm';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useModesCache from '../useModesCache';
import useAssetId from 'pages/Assets/hooks/useAssetId';

const useAddMode = ({ onSuccess }: { onSuccess: () => void }) => {
  const assetId = useAssetId();
  const { tenantId } = useTenant();
  const { addToCache } = useModesCache(assetId);
  const addModeMutation = useMutation<
    AssetMode,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsModesCreateCreate(
          assetId,
          Number(tenantId),
          {
            name: values.name,
            description: values.description,
          },
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        addToCache(data);
        notification.success({
          message: 'Added mode',
          description: (
            <>
              Mode <strong>{data.name}</strong> has been added.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new mode. Please try later.',
        );

        Logger.error(
          `Unable to add a new mode for Asset(id=${assetId}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getInitialValues(),
    validationSchema: schema,
    addModeMutation,
  };
};

export default useAddMode;
