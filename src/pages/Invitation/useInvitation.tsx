import { useQuery } from 'react-query';
import tenantsQueryKeys from 'api/queryKeys/tenants';
import useTenant from 'hooks/useTenant';
import tenantsServices from 'api/services/tenants';
import { useParams } from 'react-router-dom';
import { noop } from 'utils/api';

const useInvitation = () => {
  const { tenantId } = useTenant();
  const { token } = useParams<{ token: string }>();

  if (!tenantId) {
    throw new Error('Missing tenant id');
  }

  const query = useQuery(
    token ? tenantsQueryKeys.invitationDetails(tenantId, token) : [],
    token ? () => tenantsServices.invitationDetails(tenantId, token) : noop,
    {
      enabled: !!token,
    },
  );

  return { token, ...query };
};

export default useInvitation;
