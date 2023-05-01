import { useMutation, useQueryClient } from 'react-query';
import tenantServices from 'api/services/tenants';
import { Me, MeUpdate } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { CountryPhoneInputValue } from 'antd-country-phone-input';
import { FormikHelpers } from 'formik';
import { apiValidationErrors } from 'utils/api';
import { notification } from 'antd';
import tenantsQueryKeys from 'api/queryKeys/tenants';

export type MeUpdateFormData = Omit<MeUpdate, 'phone_number'> & {
  phone_number?: CountryPhoneInputValue;
};

const useMeUpdate = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useMutation<
    Me,
    Error,
    {
      values: MeUpdateFormData;
      formikHelpers: FormikHelpers<MeUpdateFormData>;
    }
  >(
    ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      const meUpdateData = {
        ...values,
        phone_number:
          values.phone_number?.code && values.phone_number.phone
            ? `+${values.phone_number.code}${values.phone_number.phone}`
            : undefined,
      };
      return tenantServices.meUpdate(tenantId, meUpdateData);
    },
    {
      onSuccess: (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }

        queryClient.setQueryData<Me>(tenantsQueryKeys.me(tenantId), data);

        notification.success({
          message: 'Your profile has been updated.',
        });
      },
      onError: (error, { formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to update profile. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
};

export default useMeUpdate;
