import { useQuery } from 'react-query';
import assetsQueryKeys from 'api/queryKeys/assets';
import useTenant from 'hooks/useTenant';
import { TenantsService } from 'api/schema';
import { noop } from 'utils/api';

async function fetch({
  tenantId,
  assetId,
  baselineId,
  emissionManagementPlanId,
}: {
  tenantId: number;
  assetId: number;
  baselineId: number;
  emissionManagementPlanId: number;
}) {
  const { data } =
    await TenantsService.tenantsEmissionsAssetsBaselinesEmissionManagementPlansRetrieve(
      assetId,
      baselineId,
      emissionManagementPlanId,
      tenantId,
    );
  return data;
}

const useEmissionManagementPlan = ({
  assetId,
  baselineId,
  emissionManagementPlanId,
}: {
  assetId: number;
  baselineId: number | undefined;
  emissionManagementPlanId: number | undefined;
}) => {
  const { tenantId } = useTenant();
  const enabled = !!tenantId && !!baselineId && !!emissionManagementPlanId;

  return useQuery(
    enabled
      ? assetsQueryKeys.emissionManagementPlan({
          tenantId,
          assetId,
          baselineId,
          emissionManagementPlanId,
        })
      : [],
    enabled
      ? () =>
          fetch({
            tenantId,
            assetId,
            baselineId,
            emissionManagementPlanId,
          })
      : noop,
    {
      enabled,
    },
  );
};

export default useEmissionManagementPlan;
