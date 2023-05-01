import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { MaterialTypeList, TenantsService } from 'api/schema';
import Modal from 'components/Modal';
import { usePaginationProvider } from 'components/PaginationProvider';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateMaterialTypesCache from '../useInvalidateMaterialTypesCache';

type DeleteMaterialTypeParams = {
  materialType: MaterialTypeList;
  onSuccess?: () => void;
};

const useDeleteMaterialType = () => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const pagination = usePaginationProvider();
  const invalidateMaterialTypesCache = useInvalidateMaterialTypesCache();

  const confirmDeleteMaterialType = useCallback(
    ({ materialType }: { materialType: MaterialTypeList }, onOk: () => void) =>
      Modal.confirm({
        title: 'Delete material type',
        content: (
          <>
            Are you sure you want to delete <strong>{materialType.type}</strong>{' '}
            material type?
          </>
        ),
        icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
        okButtonProps: {
          danger: true,
        },
        okText: 'Delete',
        onOk,
      }),
    [colors.red],
  );

  const { mutate: deleteMaterialType, isLoading: isDeletingMaterialType } =
    useMutation<void, Error, DeleteMaterialTypeParams>(
      async ({ materialType }) => {
        const { data } =
          await TenantsService.tenantsEmissionsMaterialTypesDeleteDestroy(
            materialType.id,
            Number(tenantId),
          );
        return data;
      },
      {
        onSuccess: async (_, { materialType, onSuccess }) => {
          pagination.reset();
          invalidateMaterialTypesCache();
          notification.success({
            message: 'Deleted material type',
            description: (
              <>
                Material type <strong>{materialType.type}</strong> has been
                deleted.
              </>
            ),
          });

          if (onSuccess) {
            onSuccess();
          }
        },
        onError: (error, { materialType }) => {
          const { nonFieldErrors } = apiValidationErrors(
            error,
            'Material type cannot be deleted right now. Please try later.',
          );
          notification.error({
            message: nonFieldErrors,
          });
          Logger.error(
            `Unable to delete the MaterialType(id=${materialType.id}).`,
            error,
          );
        },
      },
    );

  const onDeleteMaterialType = useCallback(
    (params: DeleteMaterialTypeParams) => {
      confirmDeleteMaterialType(params, () => deleteMaterialType(params));
    },
    [confirmDeleteMaterialType, deleteMaterialType],
  );
  return {
    onDeleteMaterialType,
    isDeletingMaterialType,
  };
};

export default useDeleteMaterialType;
