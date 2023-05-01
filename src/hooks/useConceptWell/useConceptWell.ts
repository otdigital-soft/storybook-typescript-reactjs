import { useQuery } from 'react-query';
import wellsQueryKeys from 'api/queryKeys/wells';
import wellsServices from 'api/services/wells';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';

const useConceptWell = (wellId: number | undefined) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId && !!wellId;

  return useQuery(
    enabled ? wellsQueryKeys.conceptWell(tenantId, wellId) : [],
    enabled ? () => wellsServices.conceptWell(tenantId, wellId) : noop,
    {
      enabled,
    },
  );
};

export default useConceptWell;
