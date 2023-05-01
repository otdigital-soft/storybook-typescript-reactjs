import assetsQueryKeys from 'api/queryKeys/assets';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';
import { TenantsService } from 'api/schema';

async function fetch(tenantId: number) {
  const { data } =
    await TenantsService.tenantsEmissionsAssetsReferenceMaterialRetrieve(
      tenantId,
    );
  return data;
}

const useAssetReferenceMaterial = () => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId;

  return useQuery(
    enabled ? assetsQueryKeys.assetReferenceMaterial(tenantId) : [],
    enabled ? () => fetch(tenantId) : noop,
    {
      enabled,
    },
  );
};

export default useAssetReferenceMaterial;
