import { useMutation } from 'react-query';
import tenantsServices from 'api/services/tenants';
import useTenant from 'hooks/useTenant';
import useSignOutLocal from 'hooks/useSignOutLocal';
import { notification } from 'antd';

const useDeleteAccount = () => {
  const { tenantId } = useTenant();
  const { signOutLocal } = useSignOutLocal();

  return useMutation(
    () => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return tenantsServices.deleteAccount(tenantId);
    },
    {
      onSuccess: () => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }

        signOutLocal();
      },
      onError: (e) => {
        notification.error({
          message: 'Unable to delete account',
        });
        console.error('Unable to delete account', e);
      },
    },
  );
};

export default useDeleteAccount;
