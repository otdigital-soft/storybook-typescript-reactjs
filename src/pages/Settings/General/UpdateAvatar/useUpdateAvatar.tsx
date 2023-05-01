import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import tenantsServices from 'api/services/tenants';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import { Me } from 'api/schema';
import { notification } from 'antd';
import Logger from 'utils/logger';

const useUpdateAvatar = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useMutation(
    (avatar: File) => {
      if (!tenantId) {
        throw new Error('Missing tenant id.');
      }

      return tenantsServices.updateAvatar(tenantId, avatar);
    },
    {
      onSuccess: (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }

        queryClient.setQueryData<Me>(tenantsQueryKeys.me(tenantId), data);

        notification.success({
          message: 'Avatar has been updated.',
        });
      },
      onError: (e) => {
        Logger.error('Unable to update avatar', e);
        notification.error({
          message: 'Unable to update avatar. Try again later.',
        });
      },
    },
  );
};

export default useUpdateAvatar;
