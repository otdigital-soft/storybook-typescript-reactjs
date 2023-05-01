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

const useEditVesselType = ({
  onSuccess,
  vesselType,
}: {
  onSuccess: () => void;
  vesselType?: VesselTypeList;
}) => {
  const { tenantId } = useTenant();
  const invalidateVesselTypesCache = useInvalidateVesselTypesCache();
  const editVesselTypeMutation = useMutation<
    VesselTypeList,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    async ({ values }) => {
      const { data } =
        await TenantsService.tenantsEmissionsVesselTypesUpdateUpdate(
          Number(tenantId),
          Number(vesselType?.id),
          normalizeFormValues(values),
        );

      return data;
    },
    {
      onSuccess: async (data) => {
        invalidateVesselTypesCache();
        notification.success({
          message: 'Saved vessel type',
          description: (
            <>
              Vessel type <strong>{data.type}</strong> has been saved.
            </>
          ),
        });
        onSuccess();
      },
      onError: (error, { formikHelpers, values }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save the vessel type. Please try later.',
        );

        Logger.error(
          `Unable to save the VesselType(id=${vesselType?.id}).`,
          error,
          values,
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    initialValues: getInitialValues(vesselType),
    validationSchema: schema,
    editVesselTypeMutation,
  };
};

export default useEditVesselType;
