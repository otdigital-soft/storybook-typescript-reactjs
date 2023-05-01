import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch(
  tenantId: number,
  wellPlanId: number,
  wellPlanStepId: number,
) {
  const { data } =
    await TenantsService.tenantsWellsPlannersPlannedStepsCo2Retrieve(
      tenantId,
      wellPlanId,
      wellPlanStepId,
    );
  return data;
}

const useWellPlannedStepCO2 = (wellPlanId: number, wellPlanStepId: number) => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId
      ? wellsQueryKeys.wellPlannedStepCO2(tenantId, wellPlanId, wellPlanStepId)
      : [],
    tenantId ? () => fetch(tenantId, wellPlanId, wellPlanStepId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useWellPlannedStepCO2;
