import { BaselineDetails, TenantsService } from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import {
  FormValues,
  getUpdateInitialValues,
  normalizeFormValues,
  schema,
} from '../../containers/BaselineForm';
import { useMutation } from 'react-query';
import { apiValidationErrors, isBadRequest } from 'utils/api';
import Logger from 'utils/logger';
import useUpdateBaselineDetailsCache from '../useUpdateBaselineDetailsCache';

const useUpdateBaseline = ({
  onSuccess,
  baseline,
  assetId,
}: {
  assetId: number;
  onSuccess: () => void;
  baseline?: BaselineDetails;
}) => {
  const { tenantId } = useTenant();
  const updateBaselineDetailsCache = useUpdateBaselineDetailsCache();
  const updateBaselineMutation = useMutation<
    BaselineDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsBaselinesUpdateUpdate(
          assetId,
          Number(baseline?.id),
          Number(tenantId),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        await updateBaselineDetailsCache(assetId, data);
        notification.success({
          message: 'Saved baseline',
          description: (
            <>
              Baseline <strong>{data.name}</strong> has been saved.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save the baseline. Please try later.',
        );
        if (!isBadRequest(error)) {
          Logger.error(
            `Unable to save the Baseline(id=${baseline?.id}).`,
            error,
            values,
          );
        }
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getUpdateInitialValues(baseline),
    validationSchema: schema,
    updateBaselineMutation,
  };
};

export default useUpdateBaseline;
