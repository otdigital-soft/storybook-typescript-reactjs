import { notification } from 'antd';
import { EmissionManagementPlan, TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateAssetCache from 'pages/Assets/pages/UpdateAsset/hooks/useInvalidateAssetCache';

const useActivateEmissionManagementPlan = (
  assetId: number,
  baselineId: number | undefined,
) => {
  const invalidateAssetCache = useInvalidateAssetCache();
  const { tenantId } = useTenant();

  const {
    mutate: onActivateEmissionManagementPlan,
    isLoading: isActivatingEmissionManagementPlan,
  } = useMutation<EmissionManagementPlan, Error, EmissionManagementPlan>(
    async (emissionManagementPlan) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsBaselinesEmissionManagementPlansActivateUpdate(
          assetId,
          Number(baselineId),
          emissionManagementPlan.id,
          Number(tenantId),
        );
      return data;
    },
    {
      onSuccess: async (emissionManagementPlan) => {
        notification.success({
          message: 'Activated energy management plan',
          description: (
            <>
              Energy management plan "
              <strong>{emissionManagementPlan.name}</strong>" has been
              activated.
            </>
          ),
        });
        invalidateAssetCache(assetId);
      },
      onError: (error, emissionManagementPlan) => {
        const { nonFieldErrors } = apiValidationErrors(
          error,
          'Unable to activate the energy management plan. Please try later.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        Logger.error(
          `Unable to activate the EmissionManagementPlan(id=${emissionManagementPlan.id})`,
          error,
        );
      },
    },
  );

  return {
    onActivateEmissionManagementPlan,
    isActivatingEmissionManagementPlan,
  };
};

export default useActivateEmissionManagementPlan;
