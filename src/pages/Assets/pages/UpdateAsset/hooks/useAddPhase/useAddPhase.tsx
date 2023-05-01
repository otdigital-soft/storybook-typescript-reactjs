import { AssetPhase, TenantsService } from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import {
  FormValues,
  schema,
  getInitialValues,
} from '../../containers/PhaseForm';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import usePhasesCache from '../usePhasesCache';
import useAssetId from 'pages/Assets/hooks/useAssetId';

const useAddPhase = ({ onSuccess }: { onSuccess: () => void }) => {
  const assetId = useAssetId();
  const { tenantId } = useTenant();
  const { addToCache } = usePhasesCache(assetId);
  const addPhaseMutation = useMutation<
    AssetPhase,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsPhasesCreateCreate(
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
          message: 'Added phase',
          description: (
            <>
              Phase <strong>{data.name}</strong> has been added.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new phase. Please try later.',
        );

        Logger.error(
          `Unable to add a new phase for Asset(id=${assetId}).`,
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
    addPhaseMutation,
  };
};

export default useAddPhase;
