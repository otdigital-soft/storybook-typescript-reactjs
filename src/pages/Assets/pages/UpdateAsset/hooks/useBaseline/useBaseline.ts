import { useQuery } from 'react-query';
import assetsQueryKeys from 'api/queryKeys/assets';
import useTenant from 'hooks/useTenant';
import { TenantsService } from 'api/schema';
import { noop } from 'utils/api';

async function fetch({
  tenantId,
  assetId,
  baselineId,
}: {
  tenantId: number;
  assetId: number;
  baselineId: number;
}) {
  const { data } = await TenantsService.tenantsEmissionsAssetsBaselinesRetrieve(
    assetId,
    baselineId,
    tenantId,
  );
  return data;
}

const useBaseline = (assetId: number, baselineId: number | undefined) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId && !!baselineId;

  return useQuery(
    enabled
      ? assetsQueryKeys.baseline({
          tenantId,
          assetId,
          baselineId,
        })
      : [],
    enabled
      ? () =>
          fetch({
            tenantId,
            assetId,
            baselineId,
          })
      : noop,
    {
      enabled,
    },
  );
};

export default useBaseline;
