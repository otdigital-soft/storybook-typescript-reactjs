import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { TenantsService, WellPlannerDetails } from 'api/schema';
import Modal from 'components/Modal';
import useTenant from 'hooks/useTenant';
import useInvalidateWellCompletePlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellCompletePlanCO2Cache';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';

type DeleteCompleteHelicopterUseParams = {
  helicopterUseId: number;
  helicopterType: string;
  onDelete: () => void;
};

const useDeleteCompleteHelicopter = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const { invalidateWellCompletePlanCO2CacheWithoutMeasurements } =
    useInvalidateWellCompletePlanCO2Cache();

  const confirmDeleteCompleteHelicopter = useCallback(
    ({ helicopterType }: DeleteCompleteHelicopterUseParams, onOk: () => void) =>
      Modal.confirm({
        title: 'Delete helicopter',
        content: (
          <>
            Are you sure you want to delete <strong>{helicopterType}</strong>{' '}
            helicopter?
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

  const {
    mutate: deleteCompleteHelicopter,
    isLoading: isDeletingCompleteHelicopter,
  } = useMutation<WellPlannerDetails, Error, DeleteCompleteHelicopterUseParams>(
    async ({ helicopterUseId }) => {
      const { data } =
        await TenantsService.tenantsEmissionsWellsCompleteHelicopterUsesDeleteDestroy(
          helicopterUseId,
          Number(tenantId),
          wellPlanId,
        );
      return data;
    },
    {
      onSuccess: async (data, { helicopterType, onDelete }) => {
        notification.success({
          message: 'Deleted helicopter',
          description: (
            <>
              Helicopter <strong>{helicopterType}</strong> has been deleted.
            </>
          ),
        });

        setWellPlanData(data);
        await invalidateWellCompletePlanCO2CacheWithoutMeasurements(data.id);
        onDelete();
      },
      onError: (error, data) => {
        const { nonFieldErrors } = apiValidationErrors(
          error,
          'Helicopter cannot be deleted right now. Please try later.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        Logger.error(
          `Unable to delete a CompleteHelicopterUse(id=${data.helicopterUseId}).`,
          error,
          data,
        );
      },
    },
  );

  const onDeleteCompleteHelicopter = useCallback(
    (params: DeleteCompleteHelicopterUseParams) => {
      confirmDeleteCompleteHelicopter(params, () =>
        deleteCompleteHelicopter(params),
      );
    },
    [confirmDeleteCompleteHelicopter, deleteCompleteHelicopter],
  );
  return {
    onDeleteCompleteHelicopter,
    isDeletingCompleteHelicopter,
  };
};

export default useDeleteCompleteHelicopter;
