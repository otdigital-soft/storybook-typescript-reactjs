import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { WellPlannerList, TenantsService } from 'api/schema';
import Modal from 'components/Modal';
import useTenant from 'hooks/useTenant';
import useInvalidateBaselineCache from 'hooks/useInvalidateBaselineCache';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors, isBadRequest } from 'utils/api';
import Logger from 'utils/logger';
import useInvalidateWellsCache from '../useInvalidateWellsCache/useInvalidateWellsCache';
import { usePaginationProvider } from 'components/PaginationProvider';

const useDeleteWell = () => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();

  const pagination = usePaginationProvider();
  const invalidateWellsCache = useInvalidateWellsCache();
  const { invalidateBaselineCache } = useInvalidateBaselineCache();

  const { mutate: deleteWell, isLoading: isDeletingWell } = useMutation<
    void,
    Error,
    WellPlannerList
  >(
    async (well) => {
      await TenantsService.tenantsEmissionsWellsDeleteDestroy(
        Number(tenantId),
        well.id,
      );
      return;
    },
    {
      onSuccess: async (_, well) => {
        invalidateWellsCache();
        invalidateBaselineCache(well.asset.id, well.baseline.id);
        pagination.reset();

        notification.success({
          message: 'Deleted well',
          description: (
            <>
              Well "<strong>{well.name.name}</strong>" has been deleted.
            </>
          ),
        });
      },
      onError: (error, well) => {
        const { nonFieldErrors } = apiValidationErrors(
          error,
          'Unable to delete the well. Please try later.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        if (!isBadRequest(error)) {
          Logger.error(
            `Unable to delete the WellPlanner(id=${well.id})`,
            error,
          );
        }
      },
    },
  );

  const onDeleteWell = useCallback(
    (well: WellPlannerList) => {
      Modal.confirm({
        title: 'Delete well',
        content: (
          <>
            Are you sure you want to delete well "
            <strong>{well.name.name}</strong>"?
          </>
        ),
        icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
        okButtonProps: {
          danger: true,
        },
        okText: 'Delete',
        onOk: () => deleteWell(well),
      });
    },
    [colors.red, deleteWell],
  );

  return {
    onDeleteWell,
    isDeletingWell,
  };
};

export default useDeleteWell;
