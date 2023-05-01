import useTenant from 'hooks/useTenant';
import { useQueryClient } from 'react-query';
import { useCallback } from 'react';
import assetsQueryKeys from 'api/queryKeys/assets';
import { EmissionManagementPlanDetails } from 'api/schema';
import useInvalidateAssetCache from 'pages/Assets/pages/UpdateAsset/hooks/useInvalidateAssetCache';

const useUpdateEmissionManagementPlanDetailsCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const invalidateAssetCache = useInvalidateAssetCache();

  return useCallback(
    async ({
      assetId,
      baselineId,
      data,
    }: {
      assetId: number;
      baselineId: number;
      data: EmissionManagementPlanDetails;
    }) => {
      invalidateAssetCache(assetId);
      const cacheKey = assetsQueryKeys.emissionManagementPlan({
        tenantId: Number(tenantId),
        assetId,
        baselineId,
        emissionManagementPlanId: data.id,
      });
      return queryClient.setQueryData<EmissionManagementPlanDetails>(
        cacheKey,
        data,
      );
    },
    [invalidateAssetCache, queryClient, tenantId],
  );
};

export default useUpdateEmissionManagementPlanDetailsCache;
