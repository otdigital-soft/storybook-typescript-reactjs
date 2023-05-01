import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';
import axios from 'axios';

async function fetch(tenantId: number) {
  try {
    const { data } = await TenantsService.tenantsWellsReferenceMaterialRetrieve(
      tenantId,
    );
    return data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) {
      return null;
    }
    throw e;
  }
}

const useWellReferenceMaterial = () => {
  const { tenantId } = useTenant();

  return useQuery(
    tenantId ? wellsQueryKeys.wellReferenceMaterial(tenantId) : [],
    tenantId ? () => fetch(tenantId) : noop,
    {
      enabled: !!tenantId,
    },
  );
};

export default useWellReferenceMaterial;
