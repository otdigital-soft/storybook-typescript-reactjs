import { useMutation, useQueryClient } from 'react-query';
import tenantsServices from 'api/services/tenants';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import useTenant from 'hooks/useTenant';
import { Me } from 'api/schema';

const usePrivacyPolicyAccept = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useMutation<void, Error>(
    () => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return tenantsServices.policyLatestAccept(tenantId);
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
            privacy_policy_consent_valid: true,
          });
        }
      },
    },
  );
};

export default usePrivacyPolicyAccept;
