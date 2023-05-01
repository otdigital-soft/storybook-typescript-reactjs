import { useQuery } from 'react-query';
import assetsQueryKeys from 'api/queryKeys/assets';
import useTenant from 'hooks/useTenant';
import { TenantsService } from 'api/schema';
import { noop } from 'utils/api';

async function fetch({
  tenantId,
  assetId,
}: {
  tenantId: number;
  assetId: number;
}) {
  const { data } = await TenantsService.tenantsEmissionsAssetsRetrieve(
    assetId,
    tenantId,
  );
  return data;
}

const useAsset = (assetId: number) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId;

  return useQuery(
    enabled ? assetsQueryKeys.asset(tenantId, assetId) : [],
    enabled
      ? () =>
          fetch({
            tenantId,
            assetId,
          })
      : noop,
    {
      enabled,
    },
  );
};

export default useAsset;
