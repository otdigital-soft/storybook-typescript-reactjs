import tenantsServices from 'api/services/tenants';
import { useMutation } from 'react-query';
import useTenant from 'hooks/useTenant';
import { notification } from 'antd';
import useSignOutLocal from 'hooks/useSignOutLocal';
import Logger from 'utils/logger';

const useSignOut = () => {
  const { tenantId } = useTenant();
  const { signOutLocal } = useSignOutLocal();

  return useMutation<void>(
    () => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return tenantsServices.logout(tenantId);
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
          message: 'Unable to sign out',
        });
        Logger.error('Unable to sign out', e);
      },
    },
  );
};

export default useSignOut;
