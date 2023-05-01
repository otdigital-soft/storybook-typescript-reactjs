import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { EMISSION_REDUCTION_INITIATIVE_TYPE_ORDER_MAP } from 'pages/WellPlan/consts';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';
import { groupByKey } from 'utils/data';

async function fetch(tenantId: number, wellPlanId: number) {
  const { data } =
    await TenantsService.tenantsWellsPlannersEmissionReductionInitiativesList(
      tenantId,
      wellPlanId,
    );
  return data;
}

const useWellPlannerEmissionReductionInitiatives = (
  wellPlanId: number | undefined,
) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId && !!wellPlanId;

  const query = useQuery(
    enabled
      ? wellsQueryKeys.wellEmissionReductionInitiatives(tenantId, wellPlanId)
      : [],
    enabled ? () => fetch(tenantId, wellPlanId) : noop,
    {
      enabled,
    },
  );
  const { data: emissionReductionInitiativesData } = query;
  const sortedEmissionReductionInitiativesData =
    emissionReductionInitiativesData || [];
  sortedEmissionReductionInitiativesData.sort(
    (first, second) =>
      EMISSION_REDUCTION_INITIATIVE_TYPE_ORDER_MAP[first.type] -
      EMISSION_REDUCTION_INITIATIVE_TYPE_ORDER_MAP[second.type],
  );
  const groupedEmissionReductionInitiativesData = groupByKey(
    sortedEmissionReductionInitiativesData,
    'type',
  );
  return {
    ...query,
    sortedEmissionReductionInitiativesData,
    groupedEmissionReductionInitiativesData,
  };
};

export default useWellPlannerEmissionReductionInitiatives;
