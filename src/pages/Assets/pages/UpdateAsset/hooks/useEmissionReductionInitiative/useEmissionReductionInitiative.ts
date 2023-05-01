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
  emissionReductionInitiativeId,
}: {
  tenantId: number;
  assetId: number;
  baselineId: number;
  emissionManagementPlanId: number;
  emissionReductionInitiativeId: number;
}) {
  const { data } =
    await TenantsService.tenantsEmissionsAssetsBaselinesEmissionManagementPlansEmissionReductionInitiativesRetrieve(
      assetId,
      baselineId,
      emissionManagementPlanId,
      emissionReductionInitiativeId,
      tenantId,
    );
  return data;
}

const useEmissionReductionInitiative = ({
  assetId,
  baselineId,
  emissionManagementPlanId,
  emissionReductionInitiativeId,
}: {
  assetId: number;
  baselineId: number | undefined;
  emissionManagementPlanId: number | undefined;
  emissionReductionInitiativeId: number | undefined;
}) => {
  const { tenantId } = useTenant();
  const enabled =
    !!tenantId &&
    !!baselineId &&
    !!emissionManagementPlanId &&
    !!emissionReductionInitiativeId;

  return useQuery(
    enabled
      ? assetsQueryKeys.emissionReductionInitiative({
          tenantId,
          assetId,
          baselineId,
          emissionManagementPlanId,
          emissionReductionInitiativeId,
        })
      : [],
    enabled
      ? () =>
          fetch({
            tenantId,
            assetId,
            baselineId,
            emissionManagementPlanId,
            emissionReductionInitiativeId,
          })
      : noop,
    {
      enabled,
    },
  );
};

export default useEmissionReductionInitiative;
