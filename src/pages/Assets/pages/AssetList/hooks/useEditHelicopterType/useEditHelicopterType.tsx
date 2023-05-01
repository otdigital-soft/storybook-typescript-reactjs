import { notification } from 'antd';
import { HelicopterTypeList, TenantsService } from 'api/schema';
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

const useEditHelicopterType = ({
  onSuccess,
  helicopterType,
}: {
  onSuccess: () => void;
  helicopterType?: HelicopterTypeList;
}) => {
  const { tenantId } = useTenant();
  const invalidateHelicopterTypeCache = useInvalidateHelicopterTypesCache();
  const editHelicopterTypeMutation = useMutation<
    HelicopterTypeList,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsHelicopterTypesUpdateUpdate(
          Number(helicopterType?.id),
          Number(tenantId),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        invalidateHelicopterTypeCache();
        notification.success({
          message: 'Saved helicopter type',
          description: (
            <>
              Helicopter type <strong>{data.type}</strong> has been saved.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save the helicopter type. Please try later.',
        );

        Logger.error(
          `Unable to save the HelicopterType(id=${helicopterType?.id}).`,
          error,
          values,
        );

        formikHelpers.setErrors(fieldErrors);
        formikHelpers.setStatus(nonFieldErrors);
      },
    },
  );

  return {
    initialValues: getInitialValues(helicopterType),
    validationSchema: schema,
    editHelicopterTypeMutation,
  };
};

export default useEditHelicopterType;
