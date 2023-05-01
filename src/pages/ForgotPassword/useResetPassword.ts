import tenantsServices from 'api/services/tenants';
import { useMutation } from 'react-query';
import useTenant from 'hooks/useTenant';
import { PasswordReset } from 'api/schema';
import { FormikHelpers } from 'formik';
import { apiValidationErrors } from 'utils/api';
import { useState } from 'react';

const useResetPassword = () => {
  const [isPasswordResetEmailSent, setIsPasswordResetEmailSent] =
    useState(false);
  const { tenantId } = useTenant();
  const passwordResetMutation = useMutation<
    void,
    Error,
    { values: PasswordReset; formikHelpers: FormikHelpers<PasswordReset> }
  >(
    ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return tenantsServices.resetPassword(tenantId, values);
    },
    {
      onSuccess: () => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        setIsPasswordResetEmailSent(true);
      },
      onError: (error, { formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to reset password. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    isPasswordResetEmailSent,
    ...passwordResetMutation,
  };
};

export default useResetPassword;
