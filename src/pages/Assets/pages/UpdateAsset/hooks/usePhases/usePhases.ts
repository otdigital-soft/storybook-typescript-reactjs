import { useQuery } from 'react-query';
import assetsQueryKeys from 'api/queryKeys/assets';
import useTenant from 'hooks/useTenant';
import { TenantsService } from 'api/schema';
import { noop } from 'utils/api';

async function fetch(tenantId: number, assetId: number) {
  const { data } = await TenantsService.tenantsEmissionsAssetsPhasesList(
    assetId,
    tenantId,
  );
  return data;
}

const usePhases = (assetId: number) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId;

  return useQuery(
    enabled ? assetsQueryKeys.phases(tenantId, assetId) : [],
    enabled ? () => fetch(tenantId, assetId) : noop,
    {
      enabled,
    },
  );
};

export default usePhases;
