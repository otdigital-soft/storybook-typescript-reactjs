import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch(tenantId: number, wellPlannerId: number) {
  const { data } = await TenantsService.tenantsWellsPlannersModesList(
    tenantId,
    wellPlannerId,
  );
  return data;
}

const useWellPlannerModes = (wellPlannerId: number | undefined) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId && !!wellPlannerId;

  return useQuery(
    enabled ? wellsQueryKeys.modes(tenantId, wellPlannerId) : [],
    enabled ? () => fetch(tenantId, wellPlannerId) : noop,
    {
      enabled,
    },
  );
};

export default useWellPlannerModes;
