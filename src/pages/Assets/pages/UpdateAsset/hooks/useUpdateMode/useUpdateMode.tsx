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

const useUpdateMode = ({
  onSuccess,
  mode,
}: {
  onSuccess: () => void;
  mode: AssetMode | undefined;
}) => {
  const assetId = useAssetId();
  const { tenantId } = useTenant();
  const { updateCache } = useModesCache(assetId);
  const updateModeMutation = useMutation<
    AssetMode,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsModesUpdateUpdate(
          assetId,
          Number(mode?.id),
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
        updateCache(data);
        notification.success({
          message: 'Updated mode',
          description: (
            <>
              Mode <strong>{data.name}</strong> has been updated.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to update the mode. Please try later.',
        );

        Logger.error(
          `Unable to update CustomMode(id=${mode?.id}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getInitialValues(mode),
    validationSchema: schema,
    updateModeMutation,
  };
};

export default useUpdateMode;
