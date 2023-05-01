import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { notification } from 'antd';
import Logger from 'utils/logger';
import Modal from 'components/Modal';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useTheme } from 'styled-components';
import { useCallback } from 'react';
import { AssetList, TenantsService } from 'api/schema';
import { apiValidationErrors, isBadRequest } from 'utils/api';
import { usePaginationProvider } from 'components/PaginationProvider';
import useInvalidateAssetsCache from 'pages/Assets/hooks/useInvalidateAssetsCache';
import useInvalidateAssetCache from 'pages/Assets/pages/UpdateAsset/hooks/useInvalidateAssetCache';

const useDeleteAsset = () => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const invalidateAssetsCache = useInvalidateAssetsCache();
  const pagination = usePaginationProvider();
  const invalidateAssetCache = useInvalidateAssetCache();

  const { mutate: deleteAsset, isLoading: isDeletingAsset } = useMutation<
    void,
    Error,
    AssetList
  >(
    async (asset) => {
      await TenantsService.tenantsEmissionsAssetsDeleteDestroy(
        asset.id,
        Number(tenantId),
      );
      return;
    },
    {
      onSuccess: async (_, asset) => {
        notification.success({
          message: 'Deleted asset',
          description: (
            <>
              Asset "<strong>{asset.name}</strong>" has been deleted.
            </>
          ),
        });
        pagination.reset();
        invalidateAssetsCache();
        invalidateAssetCache(asset.id);
      },
      onError: (e, asset) => {
        const { nonFieldErrors } = apiValidationErrors(
          e,
          'Unable to delete the asset. Please try later.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        if (!isBadRequest(e)) {
          Logger.error(`Unable to delete the Asset(id=${asset.id})`, e);
        }
      },
    },
  );
  const onDeleteAsset = useCallback(
    (asset: AssetList) => {
      Modal.confirm({
        title: 'Delete asset',
        content: (
          <>
            Are you sure you want to delete <strong>{asset.name}</strong> asset?
          </>
        ),
        icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
        okButtonProps: {
          danger: true,
        },
        okText: 'Delete',
        onOk: () => {
          deleteAsset(asset);
        },
      });
    },
    [colors.red, deleteAsset],
  );

  return {
    onDeleteAsset,
    isDeletingAsset,
  };
};

export default useDeleteAsset;
