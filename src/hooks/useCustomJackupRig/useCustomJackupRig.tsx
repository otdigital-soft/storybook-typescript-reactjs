import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import { useQuery } from 'react-query';

const useCustomJackupRig = (rigId: number | undefined) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId && !!rigId;

  const query = useQuery(
    enabled ? rigsQueryKeys.customJackup(tenantId, rigId) : [],
    enabled ? () => rigsServices.customJackup(tenantId, rigId) : noop,
    {
      enabled,
    },
  );

  return { rigId, ...query };
};

export default useCustomJackupRig;
