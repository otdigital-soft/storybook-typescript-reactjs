import { useQuery } from 'react-query';
import rigsQueryKeys from 'api/queryKeys/rigs';
import rigsServices from 'api/services/rigs';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useCustomDrillship = (rigId: number | undefined) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId && !!rigId;
  return useQuery(
    enabled ? rigsQueryKeys.customDrillship(tenantId, rigId) : [],
    enabled ? () => rigsServices.customDrillship(tenantId, rigId) : noop,
    {
      enabled,
    },
  );
};

export default useCustomDrillship;
