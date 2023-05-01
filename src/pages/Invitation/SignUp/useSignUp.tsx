import { TenantInvitationSignup } from 'api/schema';
import { Me } from 'api/schema/models/Me';
import tenantsServices from 'api/services/tenants';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import { CountryPhoneInputValue } from 'antd-country-phone-input';

export type TenantInvitationData = Omit<
  TenantInvitationSignup,
  'phone_number'
> & {
  repeat_password: string;
  phone_number?: CountryPhoneInputValue;
  gdpr_consent: boolean;
};

const useSignUp = () => {
  const { tenantId } = useTenant();

  return useMutation<
    Me,
    Error,
    {
      values: TenantInvitationData;
      token: string;
      formikHelpers: FormikHelpers<TenantInvitationData>;
    }
  >(
    ({ values, token }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      const signupValues = {
        ...values,
        repeat_password: undefined,
        gdpr_consent: undefined,
        phone_number:
          values.phone_number?.code && values.phone_number?.phone
            ? `+${values.phone_number.code}${values.phone_number.phone}`
            : undefined,
      };

      return tenantsServices.signup(tenantId, token, signupValues);
    },
    {
      onError: (error, { formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to sign up. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
};

export default useSignUp;
