import { useQuery } from 'react-query';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import tenantsServices from 'api/services/tenants';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const usePasswordResetToken = (token?: string, uid?: string) => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId && token && uid
      ? tenantsQueryKeys.passwordResetTokenDetails(tenantId, token, uid)
      : [],
    tenantId && token && uid
      ? () => tenantsServices.passwordResetTokenDetails(tenantId, token, uid)
      : noop,
    {
      enabled: !!tenantId && !!token && !!uid,
    },
  );
};

export default usePasswordResetToken;
