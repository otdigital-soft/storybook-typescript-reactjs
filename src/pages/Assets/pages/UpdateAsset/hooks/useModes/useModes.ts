import { useQuery } from 'react-query';
import assetsQueryKeys from 'api/queryKeys/assets';
import useTenant from 'hooks/useTenant';
import { TenantsService } from 'api/schema';
import { noop } from 'utils/api';

async function fetch(tenantId: number, assetId: number) {
  const { data } = await TenantsService.tenantsEmissionsAssetsModesList(
    assetId,
    tenantId,
  );
  return data;
}

const useModes = (assetId: number) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId;

  return useQuery(
    enabled ? assetsQueryKeys.modes(tenantId, assetId) : [],
    enabled ? () => fetch(tenantId, assetId) : noop,
    {
      enabled,
    },
  );
};

export default useModes;
