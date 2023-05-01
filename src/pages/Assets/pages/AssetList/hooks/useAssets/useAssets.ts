import { useQuery } from 'react-query';
import assetsQueryKeys from 'api/queryKeys/assets';
import useTenant from 'hooks/useTenant';
import { noop } from 'utils/api';
import { TenantsService } from 'api/schema';

async function fetch({
  page,
  pageSize,
  tenantId,
}: {
  tenantId: number;
  page: number;
  pageSize: number | undefined;
}) {
  const { data } = await TenantsService.tenantsEmissionsAssetsList(
    tenantId,
    page,
    pageSize,
  );
  return data;
}

const useAssets = ({ page, pageSize }: { page: number; pageSize?: number }) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId;

  return useQuery(
    enabled ? assetsQueryKeys.assets({ tenantId, page, pageSize }) : [],
    enabled ? () => fetch({ tenantId, page, pageSize }) : noop,
    {
      enabled,
    },
  );
};

export default useAssets;
