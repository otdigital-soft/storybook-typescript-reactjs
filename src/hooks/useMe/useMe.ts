import { useQuery } from 'react-query';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import tenantsServices from 'api/services/tenants';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useMe = () => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId ? tenantsQueryKeys.me(tenantId) : [],
    tenantId ? () => tenantsServices.me(tenantId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useMe;
