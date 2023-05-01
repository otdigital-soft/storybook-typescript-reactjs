import assetsQueryKeys from 'api/queryKeys/assets';
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
  const { data } = await TenantsService.tenantsEmissionsMaterialTypesList(
    tenantId,
    page,
    pageSize,
  );
  return data;
}

const useMaterialTypes = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number | undefined;
}) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId;

  return useQuery(
    enabled ? assetsQueryKeys.materialTypes({ tenantId, page, pageSize }) : [],
    enabled ? () => fetch({ tenantId, page, pageSize }) : noop,
    {
      enabled,
    },
  );
};

export default useMaterialTypes;
