import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { notification } from 'antd';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import { AssetList, TenantsService } from 'api/schema';
import { usePaginationProvider } from 'components/PaginationProvider';
import useInvalidateAssetsCache from 'pages/Assets/hooks/useInvalidateAssetsCache';

const useDuplicateAsset = () => {
  const { tenantId } = useTenant();
  const invalidateAssetsCache = useInvalidateAssetsCache();
  const pagination = usePaginationProvider();

  const { mutate: onDuplicateAsset, isLoading: isDuplicatingAsset } =
    useMutation<AssetList, Error, AssetList>(
      async (sourceAsset) => {
        const { data } =
          await TenantsService.tenantsEmissionsAssetsDuplicateCreate(
            sourceAsset.id,
            Number(tenantId),
          );

        return data;
      },
      {
        onSuccess: async (assetCopy, sourceAsset) => {
          notification.success({
            message: 'Duplicated asset',
            description: (
              <>
                Asset <strong>{sourceAsset.name}</strong> has been duplicated.
              </>
            ),
          });
          pagination.reset();
          invalidateAssetsCache();
        },
        onError: (error, sourceAsset) => {
          const { nonFieldErrors } = apiValidationErrors(
            error,
            'Asset cannot be duplicate right now. Please try later.',
          );
          notification.error({
            message: nonFieldErrors,
          });
          Logger.error(
            `Unable to duplicate the Asset(id=${sourceAsset.id}).`,
            error,
            sourceAsset,
          );
        },
      },
    );

  return {
    onDuplicateAsset,
    isDuplicatingAsset,
  };
};

export default useDuplicateAsset;
