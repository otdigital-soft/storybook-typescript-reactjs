import tenantsQueryKeys from 'api/queryKeys/tenants';
import tenantsServices from 'api/services/tenants';
import useTenant from 'hooks/useTenant';

import { useQuery } from 'react-query';
import { noop } from 'utils/api';

const useConsentLatest = () => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId ? tenantsQueryKeys.consentLatest(tenantId) : [],
    tenantId ? () => tenantsServices.consentLatest(tenantId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useConsentLatest;
