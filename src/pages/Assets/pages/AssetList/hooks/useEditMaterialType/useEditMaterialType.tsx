import { notification } from 'antd';
import { MaterialTypeList, TenantsService } from 'api/schema';
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

const useEditMaterialType = ({
  onSuccess,
  materialType,
}: {
  onSuccess: () => void;
  materialType?: MaterialTypeList;
}) => {
  const { tenantId } = useTenant();
  const invalidateMaterialTypeCache = useInvalidateMaterialTypesCache();
  const editMaterialTypeMutation = useMutation<
    MaterialTypeList,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsMaterialTypesUpdateUpdate(
          Number(materialType?.id),
          Number(tenantId),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        invalidateMaterialTypeCache();
        notification.success({
          message: 'Saved material type',
          description: (
            <>
              Material type <strong>{data.type}</strong> has been saved.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save the material type. Please try later.',
        );

        Logger.error(
          `Unable to save the MaterialType(id=${materialType?.id}).`,
          error,
          values,
        );

        formikHelpers.setErrors(fieldErrors);
        formikHelpers.setStatus(nonFieldErrors);
      },
    },
  );

  return {
    initialValues: getInitialValues(materialType),
    validationSchema: schema,
    editMaterialTypeMutation,
  };
};

export default useEditMaterialType;
