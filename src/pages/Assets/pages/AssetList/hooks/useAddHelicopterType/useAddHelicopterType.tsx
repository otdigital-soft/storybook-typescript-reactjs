import { notification } from 'antd';
import { HelicopterTypeList, TenantsService } from 'api/schema';
import { usePaginationProvider } from 'components/PaginationProvider';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import {
  FormValues,
  getInitialValues,
  normalizeFormValues,
  schema,
} from '../../containers/HelicopterTypeForm';
import useInvalidateHelicopterTypesCache from '../useInvalidateHelicopterTypesCache';

const useAddHelicopterType = ({ onSuccess }: { onSuccess: () => void }) => {
  const { tenantId } = useTenant();
  const pagination = usePaginationProvider();
  const invalidateHelicopterTypeCache = useInvalidateHelicopterTypesCache();
  const addHelicopterTypeMutation = useMutation<
    HelicopterTypeList,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsHelicopterTypesCreateCreate(
          Number(tenantId),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        pagination.reset();
        invalidateHelicopterTypeCache();
        notification.success({
          message: 'Added helicopter type',
          description: (
            <>
              Helicopter type <strong>{data.type}</strong> has been added.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new helicopter type. Please try later.',
        );

        Logger.error('Unable to add a new helicopter type.', error, values);
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );

  return {
    initialValues: getInitialValues(),
    validationSchema: schema,
    addHelicopterTypeMutation,
  };
};

export default useAddHelicopterType;
