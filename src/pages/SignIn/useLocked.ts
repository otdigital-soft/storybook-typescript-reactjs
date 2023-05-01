import { useQuery } from 'react-query';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import tenantsServices from 'api/services/tenants';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useLocked = () => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId ? tenantsQueryKeys.meLocked(tenantId) : [],
    tenantId ? () => tenantsServices.meLocked(tenantId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useLocked;
