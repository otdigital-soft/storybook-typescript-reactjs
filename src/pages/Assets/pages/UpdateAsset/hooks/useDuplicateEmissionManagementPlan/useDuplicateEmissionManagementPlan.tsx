import { notification } from 'antd';
import { EmissionManagementPlan, TenantsService } from 'api/schema';
import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateAssetCache from 'pages/Assets/pages/UpdateAsset/hooks/useInvalidateAssetCache';

const useDuplicateEmissionManagementPlan = (
  assetId: number,
  baselineId: number | undefined,
) => {
  const { tenantId } = useTenant();
  const invalidateAssetCache = useInvalidateAssetCache();

  const {
    mutate: onDuplicateEmissionManagementPlan,
    isLoading: isDuplicatingEmissionManagementPlan,
  } = useMutation<EmissionManagementPlan, Error, EmissionManagementPlan>(
    async (sourceEmissionManagementPlan) => {
      const { data } =
        await TenantsService.tenantsEmissionsAssetsBaselinesEmissionManagementPlansDuplicateCreate(
          assetId,
          Number(baselineId),
          sourceEmissionManagementPlan.id,
          Number(tenantId),
        );

      return data;
    },
    {
      onSuccess: async (_, sourceEmissionManagementPlan) => {
        notification.success({
          message: 'Duplicated energy management plan',
          description: (
            <>
              Energy management plan{' '}
              <strong>{sourceEmissionManagementPlan.name}</strong> has been
              duplicated.
            </>
          ),
        });
        invalidateAssetCache(assetId);
      },
      onError: (error, sourceEmissionManagementPlan) => {
        const { nonFieldErrors } = apiValidationErrors(
          error,
          'Energy management plan cannot be duplicated right now. Please try later.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        Logger.error(
          `Unable to duplicate the EmissionManagementPlan(id=${sourceEmissionManagementPlan.id}).`,
          error,
          sourceEmissionManagementPlan,
        );
      },
    },
  );

  return {
    onDuplicateEmissionManagementPlan,
    isDuplicatingEmissionManagementPlan,
  };
};

export default useDuplicateEmissionManagementPlan;
