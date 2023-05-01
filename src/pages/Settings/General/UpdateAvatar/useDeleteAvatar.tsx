import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import tenantsServices from 'api/services/tenants';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import { Me } from 'api/schema';
import { notification } from 'antd';
import Logger from 'utils/logger';

const useDeleteAvatar = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      return tenantsServices.deleteAvatar(tenantId);
    },
    {
      onSuccess: () => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        const queryKey = tenantsQueryKeys.me(tenantId);

        queryClient.cancelQueries(queryKey);

        const meData = queryClient.getQueryData<Me>(queryKey);

        if (meData) {
          queryClient.setQueryData<Me>(queryKey, {
            ...meData,
            profile_image: '',
          });
        }

        notification.success({
          message: 'Avatar has been removed',
        });
      },
      onError: (e) => {
        Logger.error('Unable to remove avatar', e);
        notification.error({
          message: 'Unable to remove avatar. Try again later.',
        });
      },
    },
  );
};

export default useDeleteAvatar;
