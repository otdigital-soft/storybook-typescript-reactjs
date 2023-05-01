import useTenant from 'hooks/useTenant';
import { useQueryClient } from 'react-query';
import { useCallback } from 'react';
import assetsQueryKeys from 'api/queryKeys/assets';
import { EmissionReductionInitiativeDetails } from 'api/schema';
import useInvalidateEmissionManagementPlanCache from 'pages/Assets/pages/UpdateAsset/hooks/useInvalidateEmissionManagementPlanCache';

const useUpdateEmissionReductionInitiativeDetailsCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const invalidateEmissionManagementPlanCache =
    useInvalidateEmissionManagementPlanCache();

  return useCallback(
    async ({
      assetId,
      baselineId,
      emissionManagementPlanId,
      data,
    }: {
      assetId: number;
      baselineId: number;
      emissionManagementPlanId: number;
      data: EmissionReductionInitiativeDetails;
    }) => {
      await invalidateEmissionManagementPlanCache({
        baselineId,
        assetId,
        emissionManagementPlanId,
      });
      const cacheKey = assetsQueryKeys.emissionReductionInitiative({
        tenantId: Number(tenantId),
        assetId,
        baselineId,
        emissionManagementPlanId,
        emissionReductionInitiativeId: data.id,
      });
      return queryClient.setQueryData<EmissionReductionInitiativeDetails>(
        cacheKey,
        data,
      );
    },
    [invalidateEmissionManagementPlanCache, queryClient, tenantId],
  );
};

export default useUpdateEmissionReductionInitiativeDetailsCache;
