import assetsQueryKeys from 'api/queryKeys/assets';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch(tenantId: number) {
  const { data } = await TenantsService.tenantsEmissionsVesselTypesAllList(
    tenantId,
  );
  return data;
}

const useAllVesselTypes = () => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId;

  return useQuery(
    enabled ? assetsQueryKeys.vesselTypesAll(tenantId) : [],
    enabled ? () => fetch(tenantId) : noop,
    {
      enabled,
    },
  );
};

export default useAllVesselTypes;
