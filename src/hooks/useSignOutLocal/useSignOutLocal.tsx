import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import { getSubdomain } from 'utils/api';
import { Tenant } from 'api/schema/models/Tenant';
import { Me } from 'api/schema/models/Me';
import useTenant from 'hooks/useTenant';
import routes from 'routes';

const useSignOutLocal = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();

  const signOutLocal = () => {
    if (!tenantId) {
      throw new Error('Missing tenant id');
    }

    const tenantQueryKey = tenantsQueryKeys.tenantDetails(getSubdomain());
    const tenantQueryData = queryClient.getQueryData<Tenant>(tenantQueryKey);
    queryClient.clear();
    if (tenantQueryData) {
      queryClient.setQueryData<Tenant>(tenantQueryKey, tenantQueryData);
    }
    queryClient.setQueryData<Me | null>(tenantsQueryKeys.me(tenantId), null);
    navigate(routes.signin, { replace: true });
  };

  return { signOutLocal };
};

export default useSignOutLocal;
