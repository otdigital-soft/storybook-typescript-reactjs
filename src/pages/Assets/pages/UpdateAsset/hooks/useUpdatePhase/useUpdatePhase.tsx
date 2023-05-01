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

const useUpdatePhase = ({
  onSuccess,
  phase,
}: {
  onSuccess: () => void;
  phase: AssetPhase | undefined;
}) => {
  const assetId = useAssetId();
  const { tenantId } = useTenant();
  const { updateCache } = usePhasesCache(assetId);
  const updatePhaseMutation = useMutation<
    AssetPhase,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsPhasesUpdateUpdate(
          assetId,
          Number(phase?.id),
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
          message: 'Updated phase',
          description: (
            <>
              Phase <strong>{data.name}</strong> has been updated.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to update the phase. Please try later.',
        );

        Logger.error(
          `Unable to update CustomPhase(id=${phase?.id}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getInitialValues(phase),
    validationSchema: schema,
    updatePhaseMutation,
  };
};

export default useUpdatePhase;
