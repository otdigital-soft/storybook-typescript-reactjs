import assetsQueryKeys from 'api/queryKeys/assets';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch(tenantId: number) {
  const { data } = await TenantsService.tenantsEmissionsMaterialTypesAllList(
    tenantId,
  );
  return data;
}

const useAllMaterialTypes = () => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId;

  return useQuery(
    enabled ? assetsQueryKeys.allMaterialTypes(tenantId) : [],
    enabled ? () => fetch(tenantId) : noop,
    {
      enabled,
    },
  );
};

export default useAllMaterialTypes;
