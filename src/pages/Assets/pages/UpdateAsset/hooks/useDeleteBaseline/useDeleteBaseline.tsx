import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { Baseline, TenantsService } from 'api/schema';
import Modal from 'components/Modal';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors, isBadRequest } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateAssetCache from 'pages/Assets/pages/UpdateAsset/hooks/useInvalidateAssetCache';

const useDeleteBaseline = (assetId: number) => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const invalidateAssetCache = useInvalidateAssetCache();

  const { mutate: deleteBaseline, isLoading: isDeletingBaseline } = useMutation<
    void,
    Error,
    Baseline
  >(
    async (baseline) => {
      await TenantsService.tenantsEmissionsAssetsBaselinesDeleteDestroy(
        assetId,
        baseline.id,
        Number(tenantId),
      );
      return;
    },
    {
      onSuccess: async (_, baseline) => {
        notification.success({
          message: 'Deleted baseline',
          description: (
            <>
              Baseline "<strong>{baseline.name}</strong>" has been deleted.
            </>
          ),
        });
        invalidateAssetCache(assetId);
      },
      onError: (error, baseline) => {
        const { nonFieldErrors } = apiValidationErrors(
          error,
          'Unable to delete the baseline. Please try later.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        if (!isBadRequest(error)) {
          Logger.error(
            `Unable to delete the Baseline(id=${baseline.id})`,
            error,
          );
        }
      },
    },
  );

  const onDeleteBaseline = useCallback(
    (baseline: Baseline) => {
      Modal.confirm({
        title: 'Delete baseline',
        content: (
          <>
            Are you sure you want to delete baseline "
            <strong>{baseline.name}</strong>"?
          </>
        ),
        icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
        okButtonProps: {
          danger: true,
        },
        okText: 'Delete',
        onOk: () => deleteBaseline(baseline),
      });
    },
    [colors.red, deleteBaseline],
  );

  return {
    onDeleteBaseline,
    isDeletingBaseline,
  };
};

export default useDeleteBaseline;
