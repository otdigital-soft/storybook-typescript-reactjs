import tenantsServices from 'api/services/tenants';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import { useMutation, useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';
import { useNavigate } from 'react-router-dom';
import { Me } from 'api/schema/models/Me';
import { Locked } from 'api/schema';
import { FormikHelpers } from 'formik';
import { apiValidationErrors, isForbiddenError } from 'utils/api';
import { InitialValues } from './SignIn';
import Logger from 'utils/logger';

const useSignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  return useMutation<
    Me,
    Error,
    {
      values: InitialValues;
      formikHelpers: FormikHelpers<InitialValues>;
      resetCaptcha: () => void;
    }
  >(
    ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { show_recaptcha, ...loginValues } = values;
      return tenantsServices.login(tenantId, loginValues);
    },
    {
      onSuccess: (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        queryClient.setQueryData<Me>(tenantsQueryKeys.me(tenantId), data);
        queryClient.setQueryData<Locked>(tenantsQueryKeys.meLocked(tenantId), {
          locked: false,
        });
        Logger.setUser(data);
        navigate('/dashboard/', { replace: true });
      },
      onError: (error, { formikHelpers, resetCaptcha }) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        resetCaptcha();
        if (isForbiddenError(error)) {
          formikHelpers.setFieldValue('show_recaptcha', true);
          formikHelpers.setStatus('Invalid credentials');
          formikHelpers.setErrors({});
          queryClient.setQueryData<Locked>(
            tenantsQueryKeys.meLocked(tenantId),
            {
              locked: true,
            },
          );
        } else {
          const { nonFieldErrors, fieldErrors } = apiValidationErrors(
            error,
            'Unable to sign in. Please try later.',
          );
          formikHelpers.setStatus(nonFieldErrors);
          formikHelpers.setErrors(fieldErrors);
        }
      },
    },
  );
};

export default useSignIn;
