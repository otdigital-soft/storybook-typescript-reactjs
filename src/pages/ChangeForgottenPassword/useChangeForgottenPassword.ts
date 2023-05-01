import tenantsServices from 'api/services/tenants';
import { useMutation, useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';
import { FormikHelpers } from 'formik';
import { apiValidationErrors } from 'utils/api';
import { useState } from 'react';
import { ChangeForgottenPasswordFormValues } from './ChangeForgottenPassword';
import tenantsQueryKeys from 'api/queryKeys/tenants';

const useChangeForgottenPassword = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const changeForgottenPasswordMutation = useMutation<
    void,
    Error,
    {
      values: ChangeForgottenPasswordFormValues;
      token: string;
      uid: string;
      formikHelpers: FormikHelpers<ChangeForgottenPasswordFormValues>;
    }
  >(
    ({ values, token, uid }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return tenantsServices.changeForgottenPassword(
        tenantId,
        token,
        uid,
        values,
      );
    },
    {
      onSuccess: (_, { uid, token }) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        setIsPasswordChanged(true);
        queryClient.setQueryData(
          tenantsQueryKeys.passwordResetTokenDetails(tenantId, token, uid),
          false,
        );
      },
      onError: (error, { formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to change password. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
  return {
    isPasswordChanged,
    ...changeForgottenPasswordMutation,
  };
};

export default useChangeForgottenPassword;
