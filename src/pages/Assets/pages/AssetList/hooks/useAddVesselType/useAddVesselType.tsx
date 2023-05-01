import { TenantsService, VesselTypeList } from 'api/schema';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import {
  FormValues,
  getInitialValues,
  normalizeFormValues,
  schema,
} from '../../containers/VesselTypeForm';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateVesselTypesCache from '../useInvalidateVesselTypesCache';
import { usePaginationProvider } from 'components/PaginationProvider';

const useAddVesselType = ({ onSuccess }: { onSuccess: () => void }) => {
  const { tenantId } = useTenant();
  const pagination = usePaginationProvider();
  const invalidateVesselTypesCache = useInvalidateVesselTypesCache();
  const addVesselTypeMutation = useMutation<
    VesselTypeList,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsVesselTypesCreateCreate(
          Number(tenantId),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        pagination.reset();
        invalidateVesselTypesCache();
        notification.success({
          message: 'Added vessel type',
          description: (
            <>
              Vessel type <strong>{data.type}</strong> has been added.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new vessel type. Please try later.',
        );

        Logger.error('Unable to add a new vessel type.', error, values);
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getInitialValues(),
    validationSchema: schema,
    addVesselTypeMutation,
  };
};

export default useAddVesselType;
