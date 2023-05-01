import { useQuery } from 'react-query';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import tenantsServices from 'api/services/tenants';
import { getSubdomain } from 'utils/api';

const useTenant = () => {
  const query = useQuery(tenantsQueryKeys.tenantDetails(getSubdomain()), () =>
    tenantsServices.tenantDetails(getSubdomain()),
  );
  const { data } = query;
  return { ...query, tenantId: data?.id };
};

export default useTenant;
