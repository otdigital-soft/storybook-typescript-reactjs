import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { EmissionManagementPlan, TenantsService } from 'api/schema';
import Modal from 'components/Modal';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors, isBadRequest } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateAssetCache from 'pages/Assets/pages/UpdateAsset/hooks/useInvalidateAssetCache';
import useInvalidateBaselineCache from 'hooks/useInvalidateBaselineCache';

const useDeleteEmissionManagementPlan = (
  assetId: number,
  baselineId: number | undefined,
) => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const invalidateAssetCache = useInvalidateAssetCache();
  const { invalidateBaselineCache } = useInvalidateBaselineCache();

  const {
    mutate: deleteEmissionManagementPlan,
    isLoading: isDeletingEmissionManagementPlan,
  } = useMutation<void, Error, EmissionManagementPlan>(
    async (emissionManagementPlan) => {
      await TenantsService.tenantsEmissionsAssetsBaselinesEmissionManagementPlansDeleteDestroy(
        assetId,
        Number(baselineId),
        emissionManagementPlan.id,
        Number(tenantId),
      );
      return;
    },
    {
      onSuccess: async (_, emissionManagementPlan) => {
        notification.success({
          message: 'Deleted energy management plan',
          description: (
            <>
              Energy management plan "
              <strong>{emissionManagementPlan.name}</strong>" has been deleted.
            </>
          ),
        });
        invalidateAssetCache(assetId);
        invalidateBaselineCache(assetId, Number(baselineId));
      },
      onError: (error, emissionManagementPlan) => {
        const { nonFieldErrors } = apiValidationErrors(
          error,
          'Unable to delete the energy management plan. Please try later.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        if (!isBadRequest(error)) {
          Logger.error(
            `Unable to delete the EmissionManagementPlan(id=${emissionManagementPlan.id})`,
            error,
          );
        }
      },
    },
  );

  const onDeleteEmissionManagementPlan = useCallback(
    (emissionManagementPlan: EmissionManagementPlan) => {
      Modal.confirm({
        title: 'Delete energy management plan',
        content: (
          <>
            Are you sure you want to delete energy management plan "
            <strong>{emissionManagementPlan.name}</strong>"?
          </>
        ),
        icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
        okButtonProps: {
          danger: true,
        },
        okText: 'Delete',
        onOk: () => deleteEmissionManagementPlan(emissionManagementPlan),
      });
    },
    [colors.red, deleteEmissionManagementPlan],
  );

  return {
    onDeleteEmissionManagementPlan,
    isDeletingEmissionManagementPlan,
  };
};

export default useDeleteEmissionManagementPlan;
