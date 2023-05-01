import { useQuery } from 'react-query';
import wellsQueryKeys from 'api/queryKeys/wells';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import { TenantsService } from 'api/schema';

async function fetch(tenantId: number, wellPlanId: number) {
  const { data } =
    await TenantsService.tenantsWellsPlannersCompleteSummaryRetrieve(
      tenantId,
      wellPlanId,
    );
  return data;
}

const useWellCompletePlanSummary = (wellPlanId: number) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId
      ? wellsQueryKeys.wellCompletePlanSummary(tenantId, wellPlanId)
      : [],
    tenantId ? () => fetch(tenantId, wellPlanId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useWellCompletePlanSummary;
