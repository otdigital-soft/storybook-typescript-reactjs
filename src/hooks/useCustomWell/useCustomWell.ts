import { useQuery } from 'react-query';
import wellsQueryKeys from 'api/queryKeys/wells';
import wellsServices from 'api/services/wells';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useCustomWell = (wellId: number | undefined) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId && !!wellId;

  return useQuery(
    enabled ? wellsQueryKeys.customWell(tenantId, wellId) : [],
    enabled ? () => wellsServices.customWell(tenantId, wellId) : noop,
    {
      enabled,
    },
  );
};

export default useCustomWell;
