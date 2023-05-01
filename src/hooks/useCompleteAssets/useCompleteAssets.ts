import emissionsQueryKeys from 'api/queryKeys/assets';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch(tenantId: number) {
  const { data } = await TenantsService.tenantsEmissionsAssetsCompleteList(
    tenantId,
  );
  return data;
}

const useCompleteAssets = () => {
  const { tenantId } = useTenant();
  return useQuery(
    tenantId ? emissionsQueryKeys.completeAssets(tenantId) : [],
    tenantId ? () => fetch(tenantId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useCompleteAssets;
