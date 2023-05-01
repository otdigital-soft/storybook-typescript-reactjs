import { notification } from 'antd';
import { Baseline, TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateAssetCache from 'pages/Assets/pages/UpdateAsset/hooks/useInvalidateAssetCache';

const useActivateBaseline = (assetId: number) => {
  const { tenantId } = useTenant();
  const invalidateAssetCache = useInvalidateAssetCache();

  const { mutate: onActivateBaseline, isLoading: isActivatingBaseline } =
    useMutation<Baseline, Error, Baseline>(
      async (baseline) => {
        const { data } =
          await TenantsService.tenantsEmissionsAssetsBaselinesActivateUpdate(
            assetId,
            baseline.id,
            Number(tenantId),
          );
        return data;
      },
      {
        onSuccess: async (baseline) => {
          notification.success({
            message: 'Activated baseline',
            description: (
              <>
                Baseline "<strong>{baseline.name}</strong>" has been activated.
              </>
            ),
          });
          invalidateAssetCache(assetId);
        },
        onError: (error, baseline) => {
          const { nonFieldErrors } = apiValidationErrors(
            error,
            'Unable to activate the baseline. Please try later.',
          );
          notification.error({
            message: nonFieldErrors,
          });
          Logger.error(
            `Unable to activate the Baseline(id=${baseline.id})`,
            error,
          );
        },
      },
    );

  return {
    onActivateBaseline,
    isActivatingBaseline,
  };
};

export default useActivateBaseline;
