import { useMutation } from 'react-query';
import tenantsServices from 'api/services/tenants';
import useTenant from 'hooks/useTenant';
import { ChangePasswordFormValues } from './ChangePassword';
import { FormikHelpers } from 'formik';
import { notification } from 'antd';
import { apiValidationErrors } from 'utils/api';
import useMe from 'hooks/useMe';

const useChangePassword = () => {
  const { tenantId } = useTenant();
  const { data: meData } = useMe();

  return useMutation<
    void,
    Error,
    {
      values: ChangePasswordFormValues;
      formikHelpers: FormikHelpers<ChangePasswordFormValues>;
    }
  >(
    ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      if (!meData) {
        throw new Error('Missing me data.');
      }

      return tenantsServices.changePassword(tenantId, meData.email, values);
    },
    {
      onSuccess: (_, { formikHelpers }) => {
        notification.success({
          message: 'Your password has been changed.',
        });
        formikHelpers.resetForm();
      },
      onError: (error, { formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to change password',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
      },
    },
  );
};

export default useChangePassword;
