import { notification } from 'antd';
import { Baseline, TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateAssetCache from 'pages/Assets/pages/UpdateAsset/hooks/useInvalidateAssetCache';

const useDuplicateBaseline = (assetId: number) => {
  const { tenantId } = useTenant();
  const invalidateAssetCache = useInvalidateAssetCache();

  const { mutate: onDuplicateBaseline, isLoading: isDuplicatingBaseline } =
    useMutation<Baseline, Error, Baseline>(
      async (baseline) => {
        const { data } =
          await TenantsService.tenantsEmissionsAssetsBaselinesDuplicateCreate(
            assetId,
            baseline.id,
            Number(tenantId),
          );

        return data;
      },
      {
        onSuccess: async (_, baseline) => {
          notification.success({
            message: 'Duplicated baseline',
            description: (
              <>
                Baseline <strong>{baseline.name}</strong> has been duplicated.
              </>
            ),
          });
          invalidateAssetCache(assetId);
        },
        onError: (error, baseline) => {
          const { nonFieldErrors } = apiValidationErrors(
            error,
            'Baseline cannot be duplicated right now. Please try later.',
          );
          notification.error({
            message: nonFieldErrors,
          });
          Logger.error(
            `Unable to duplicate the Baseline(id=${baseline.id}).`,
            error,
            baseline,
          );
        },
      },
    );

  return {
    onDuplicateBaseline,
    isDuplicatingBaseline,
  };
};

export default useDuplicateBaseline;
