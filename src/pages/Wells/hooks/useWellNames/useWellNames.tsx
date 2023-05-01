import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch(tenantId: number) {
  const { data } = await TenantsService.tenantsEmissionsWellNamesList(tenantId);
  return data;
}

const useWellNames = () => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId;

  return useQuery(
    enabled ? wellsQueryKeys.wellNames(tenantId) : [],
    enabled ? () => fetch(tenantId) : noop,
    {
      enabled,
    },
  );
};

export default useWellNames;
