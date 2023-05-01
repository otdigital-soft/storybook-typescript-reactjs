import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { TenantsService, WellPlannerDetails } from 'api/schema';
import Modal from 'components/Modal';
import useTenant from 'hooks/useTenant';
import useInvalidateWellPlannedPlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellPlannedPlanCO2Cache';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';

type DeletePlannedHelicopterParams = {
  helicopterUseId: number;
  helicopterType: string;
  onDelete: () => void;
};

const useDeletePlannedHelicopter = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const {
    invalidateWellPlannedPlanCO2Cache,
    invalidateWellPlannedStepsCO2Cache,
  } = useInvalidateWellPlannedPlanCO2Cache();
  const confirmDeletePlannedHelicopter = useCallback(
    ({ helicopterType }: DeletePlannedHelicopterParams, onOk: () => void) =>
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
    mutate: deletePlannedHelicopter,
    isLoading: isDeletingPlannedHelicopter,
  } = useMutation<WellPlannerDetails, Error, DeletePlannedHelicopterParams>(
    async ({ helicopterUseId }) => {
      const { data } =
        await TenantsService.tenantsEmissionsWellsPlannedHelicopterUsesDeleteDestroy(
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
        await invalidateWellPlannedPlanCO2Cache(wellPlanId);
        await invalidateWellPlannedStepsCO2Cache(wellPlanId);
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
          `Unable to delete a PlannedHelicopterUse(id=${data.helicopterUseId}).`,
          error,
          data,
        );
      },
    },
  );

  const onDeletePlannedHelicopter = useCallback(
    (params: DeletePlannedHelicopterParams) => {
      confirmDeletePlannedHelicopter(params, () =>
        deletePlannedHelicopter(params),
      );
    },
    [confirmDeletePlannedHelicopter, deletePlannedHelicopter],
  );
  return {
    onDeletePlannedHelicopter,
    isDeletingPlannedHelicopter,
  };
};

export default useDeletePlannedHelicopter;
