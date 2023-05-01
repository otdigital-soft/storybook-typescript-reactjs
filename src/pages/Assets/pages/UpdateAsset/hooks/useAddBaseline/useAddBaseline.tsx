import { BaselineDetails, TenantsService } from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import {
  FormValues,
  getAddInitialValues,
  normalizeFormValues,
  schema,
} from '../../containers/BaselineForm';
import { useMutation } from 'react-query';
import { apiValidationErrors, isBadRequest } from 'utils/api';
import Logger from 'utils/logger';
import useUpdateBaselineDetailsCache from '../useUpdateBaselineDetailsCache';

const useAddBaseline = ({
  onSuccess,
  assetId,
  initialPhases,
  initialModes,
}: {
  onSuccess: () => void;
  assetId: number;
  initialPhases: number[];
  initialModes: number[];
}) => {
  const { tenantId } = useTenant();
  const updateBaselineDetailsCache = useUpdateBaselineDetailsCache();
  const addBaselineMutation = useMutation<
    BaselineDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsBaselinesCreateCreate(
          assetId,
          Number(tenantId),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        await updateBaselineDetailsCache(assetId, data);
        notification.success({
          message: 'Added baseline',
          description: (
            <>
              Baseline <strong>{data.name}</strong> has been added.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new baseline. Please try later.',
        );

        if (!isBadRequest(error)) {
          Logger.error(
            `Unable to add a new Baseline for Asset(id=${assetId}).`,
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
    initialValues: getAddInitialValues({
      initialPhases,
      initialModes,
    }),
    validationSchema: schema,
    addBaselineMutation,
  };
};

export default useAddBaseline;
