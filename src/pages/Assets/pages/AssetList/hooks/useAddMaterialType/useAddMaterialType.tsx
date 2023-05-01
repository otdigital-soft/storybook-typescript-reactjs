import { notification } from 'antd';
import { MaterialTypeList, TenantsService } from 'api/schema';
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
} from '../../containers/MaterialTypeForm';

import useInvalidateMaterialTypesCache from '../useInvalidateMaterialTypesCache';

const useAddMaterialType = ({ onSuccess }: { onSuccess: () => void }) => {
  const { tenantId } = useTenant();
  const pagination = usePaginationProvider();
  const invalidateMaterialTypeCache = useInvalidateMaterialTypesCache();
  const addMaterialTypeMutation = useMutation<
    MaterialTypeList,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsMaterialTypesCreateCreate(
          Number(tenantId),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        pagination.reset();
        invalidateMaterialTypeCache();
        notification.success({
          message: 'Added material type',
          description: (
            <>
              Material type <strong>{data.type}</strong> has been added.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add a new material type. Please try later.',
        );

        Logger.error('Unable to add a new material type.', error, values);
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );

  return {
    initialValues: getInitialValues(),
    validationSchema: schema,
    addMaterialTypeMutation,
  };
};

export default useAddMaterialType;
