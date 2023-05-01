import wellsQueryKeys from 'api/queryKeys/wells';
import { TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useQuery } from 'react-query';
import { noop } from 'utils/api';

async function fetch({
  page,
  pageSize,
  tenantId,
}: {
  tenantId: number;
  page: number;
  pageSize: number | undefined;
}) {
  const { data } = await TenantsService.tenantsWellsPlannersList(
    tenantId,
    page,
    pageSize,
  );
  return data;
}

const useWells = ({ page, pageSize }: { page: number; pageSize?: number }) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId;

  return useQuery(
    enabled ? wellsQueryKeys.wellPlans({ tenantId, page, pageSize }) : [],
    enabled ? () => fetch({ page, pageSize, tenantId }) : noop,
    {
      enabled,
    },
  );
};

export default useWells;
