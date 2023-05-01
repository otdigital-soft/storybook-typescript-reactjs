import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { HelicopterTypeList, TenantsService } from 'api/schema';
import Modal from 'components/Modal';
import { usePaginationProvider } from 'components/PaginationProvider';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateHelicopterTypesCache from '../useInvalidateHelicopterTypesCache';

type DeleteHelicopterTypeParams = {
  helicopterType: HelicopterTypeList;
  onSuccess?: () => void;
};

const useDeleteHelicopterType = () => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const pagination = usePaginationProvider();
  const invalidateHelicopterTypesCache = useInvalidateHelicopterTypesCache();

  const confirmDeleteHelicopterType = useCallback(
    (
      { helicopterType }: { helicopterType: HelicopterTypeList },
      onOk: () => void,
    ) =>
      Modal.confirm({
        title: 'Delete helicopter type',
        content: (
          <>
            Are you sure you want to delete{' '}
            <strong>{helicopterType.type}</strong> helicopter type?
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

  const { mutate: deleteHelicopterType, isLoading: isDeletingHelicopterType } =
    useMutation<void, Error, DeleteHelicopterTypeParams>(
      async ({ helicopterType }) => {
        const { data } =
          await TenantsService.tenantsEmissionsHelicopterTypesDeleteDestroy(
            helicopterType.id,
            Number(tenantId),
          );
        return data;
      },
      {
        onSuccess: async (_, { helicopterType, onSuccess }) => {
          pagination.reset();
          invalidateHelicopterTypesCache();
          notification.success({
            message: 'Deleted helicopter type',
            description: (
              <>
                Helicopter type <strong>{helicopterType.type}</strong> has been
                deleted.
              </>
            ),
          });

          if (onSuccess) {
            onSuccess();
          }
        },
        onError: (error, { helicopterType }) => {
          const { nonFieldErrors } = apiValidationErrors(
            error,
            'Helicopter type cannot be deleted right now. Please try later.',
          );
          notification.error({
            message: nonFieldErrors,
          });
          Logger.error(
            `Unable to delete the HelicopterType(id=${helicopterType.id}).`,
            error,
          );
        },
      },
    );

  const onDeleteHelicopterType = useCallback(
    (params: DeleteHelicopterTypeParams) => {
      confirmDeleteHelicopterType(params, () => deleteHelicopterType(params));
    },
    [confirmDeleteHelicopterType, deleteHelicopterType],
  );
  return {
    onDeleteHelicopterType,
    isDeletingHelicopterType,
  };
};

export default useDeleteHelicopterType;
