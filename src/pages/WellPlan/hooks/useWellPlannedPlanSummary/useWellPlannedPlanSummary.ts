import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch(tenantId: number, wellPlanId: number) {
  const { data } =
    await TenantsService.tenantsWellsPlannersPlannedSummaryRetrieve(
      tenantId,
      wellPlanId,
    );
  return data;
}

const useWellPlannedPlanSummary = (wellPlanId: number) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId ? wellsQueryKeys.wellPlannedPlanSummary(tenantId, wellPlanId) : [],
    tenantId ? () => fetch(tenantId, wellPlanId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useWellPlannedPlanSummary;
