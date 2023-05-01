import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService, WellPlannerPhase } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch(tenantId: number, wellPlannerId: number) {
  const { data } = await TenantsService.tenantsWellsPlannersPhasesList(
    tenantId,
    wellPlannerId,
  );
  return data;
}

const useWellPlannerPhases = (assetId: number | undefined) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId && !!assetId;

  const query = useQuery(
    enabled ? wellsQueryKeys.phases(tenantId, assetId) : [],
    enabled ? () => fetch(tenantId, assetId) : noop,
    {
      enabled,
    },
  );

  return {
    ...query,
    phaseIdMap: (query.data || []).reduce((o, phase) => {
      o[phase.id] = phase;
      return o;
    }, {} as Record<string, WellPlannerPhase | undefined>),
  };
};

export default useWellPlannerPhases;
