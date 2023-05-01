import tenantsServices from 'api/services/tenants';
import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';

const useInvitationAccept = () => {
  const { tenantId } = useTenant();

  return useMutation<void, Error, { token: string }>(({ token }) => {
    if (!tenantId) {
      throw new Error('Missing tenant id');
    }
    return tenantsServices.invitationAccept(tenantId, token);
  });
};

export default useInvitationAccept;
