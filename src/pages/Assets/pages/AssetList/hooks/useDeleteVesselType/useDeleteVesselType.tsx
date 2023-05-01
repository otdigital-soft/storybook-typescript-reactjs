import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { TenantsService, VesselTypeList } from 'api/schema';
import Modal from 'components/Modal';
import useTenant from 'hooks/useTenant';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateVesselTypesCache from '../../hooks/useInvalidateVesselTypesCache';
import { usePaginationProvider } from 'components/PaginationProvider';

type DeleteVesselTypeParams = {
  vesselType: VesselTypeList;
  onSuccess?: () => void;
};

const useDeleteVesselType = () => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const pagination = usePaginationProvider();
  const invalidateVesselTypesCache = useInvalidateVesselTypesCache();

  const confirmDeleteVesselType = useCallback(
    ({ vesselType }: { vesselType: VesselTypeList }, onOk: () => void) =>
      Modal.confirm({
        title: 'Delete vessel type',
        content: (
          <>
            Are you sure you want to delete <strong>{vesselType.type}</strong>{' '}
            vessel type?
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

  const { mutate: deleteVesselType, isLoading: isDeletingVesselType } =
    useMutation<void, Error, DeleteVesselTypeParams>(
      async ({ vesselType }) => {
        const { data } =
          await TenantsService.tenantsEmissionsVesselTypesDeleteDestroy(
            Number(tenantId),
            vesselType.id,
          );
        return data;
      },
      {
        onSuccess: async (_, { vesselType, onSuccess }) => {
          pagination.reset();
          invalidateVesselTypesCache();
          notification.success({
            message: 'Deleted vessel type',
            description: (
              <>
                Vessel type <strong>{vesselType.type}</strong> has been deleted.
              </>
            ),
          });

          if (onSuccess) {
            onSuccess();
          }
        },
        onError: (error, { vesselType }) => {
          const { nonFieldErrors } = apiValidationErrors(
            error,
            'Vessel type cannot be deleted right now. Please try later.',
          );
          notification.error({
            message: nonFieldErrors,
          });
          Logger.error(
            `Unable to delete the VesselType(id=${vesselType.id}).`,
            error,
          );
        },
      },
    );

  const onDeleteVesselType = useCallback(
    (params: DeleteVesselTypeParams) => {
      confirmDeleteVesselType(params, () => deleteVesselType(params));
    },
    [confirmDeleteVesselType, deleteVesselType],
  );
  return {
    onDeleteVesselType,
    isDeletingVesselType,
  };
};

export default useDeleteVesselType;
