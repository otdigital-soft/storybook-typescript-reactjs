import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch(tenantId: number, wellPlanId: number) {
  const { data } = await TenantsService.tenantsWellsPlannersRetrieve(
    tenantId,
    wellPlanId,
  );
  return data;
}

const useWellPlan = (wellPlanId: number) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId ? wellsQueryKeys.wellPlan(tenantId, wellPlanId) : [],
    tenantId ? () => fetch(tenantId, wellPlanId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useWellPlan;
