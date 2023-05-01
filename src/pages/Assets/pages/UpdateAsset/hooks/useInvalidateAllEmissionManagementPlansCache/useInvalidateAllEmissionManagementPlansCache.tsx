import { useCallback } from 'react';
import { useQueryClient } from 'react-query';
import assetsQueryKeys from 'api/queryKeys/assets';
import useTenant from 'hooks/useTenant';

const useInvalidateAllEmissionManagementPlansCache = () => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  const invalidateAllEmissionManagementPlansCache = useCallback(
    async (assetId: number, baselineId: number) => {
      await queryClient.invalidateQueries(
        assetsQueryKeys.allEmissionManagementPlans({
          tenantId: Number(tenantId),
          assetId,
          baselineId,
        }),
      );
    },
    [tenantId, queryClient],
  );

  return invalidateAllEmissionManagementPlansCache;
};

export default useInvalidateAllEmissionManagementPlansCache;
