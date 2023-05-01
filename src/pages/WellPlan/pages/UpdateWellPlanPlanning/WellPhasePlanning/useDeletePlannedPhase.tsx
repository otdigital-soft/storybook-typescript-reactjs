import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { TenantsService } from 'api/schema';
import Modal from 'components/Modal';
import useTenant from 'hooks/useTenant';
import useInvalidateWellPlannedPlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellPlannedPlanCO2Cache';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import useWellPlan from 'pages/WellPlan/hooks/useWellPlan';

type DeletePlannedPhaseParams = {
  wellPlanPhaseId: number;
  wellPlanPhaseName: string;
  onDelete: () => void;
};

const useDeletePlannedPhase = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const { data: wellPlanData } = useWellPlan(wellPlanId);
  const { invalidateWellPlannedPlanCO2Cache } =
    useInvalidateWellPlannedPlanCO2Cache();
  const confirmDeletePlannedPhase = useCallback(
    ({ wellPlanPhaseName }: DeletePlannedPhaseParams, onOk: () => void) =>
      Modal.confirm({
        title: 'Delete phase',
        content: (
          <>
            Are you sure you want to delete <strong>{wellPlanPhaseName}</strong>{' '}
            phase?
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

  const { mutate: deletePlannedPhase, isLoading: isDeletingPlannedPhase } =
    useMutation<void, Error, DeletePlannedPhaseParams>(
      async ({ wellPlanPhaseId }) => {
        const { data } =
          await TenantsService.tenantsWellsPlannersPlannedStepsDeleteDestroy(
            Number(tenantId),
            wellPlanId,
            wellPlanPhaseId,
          );
        return data;
      },
      {
        onSuccess: async (
          _,
          { wellPlanPhaseId, wellPlanPhaseName, onDelete },
        ) => {
          notification.success({
            message: 'Deleted phase',
            description: (
              <>
                Phase <strong>{wellPlanPhaseName}</strong> has been deleted.
              </>
            ),
          });

          if (wellPlanData) {
            setWellPlanData({
              ...wellPlanData,
              planned_steps: wellPlanData.planned_steps.filter(
                (step) => step.id !== wellPlanPhaseId,
              ),
            });
          }
          await invalidateWellPlannedPlanCO2Cache(wellPlanId);
          onDelete();
        },
        onError: (error, data) => {
          const { nonFieldErrors } = apiValidationErrors(
            error,
            'Phase cannot be deleted right now. Please try later.',
          );
          notification.error({
            message: nonFieldErrors,
          });
          Logger.error(
            `Unable to delete a WellPlannerPlannedStep(id=${data.wellPlanPhaseId}).`,
            error,
            data,
          );
        },
      },
    );

  const onDeletePlannedPhase = useCallback(
    (params: DeletePlannedPhaseParams) => {
      confirmDeletePlannedPhase(params, () => deletePlannedPhase(params));
    },
    [confirmDeletePlannedPhase, deletePlannedPhase],
  );
  return {
    onDeletePlannedPhase,
    isDeletingPlannedPhase,
  };
};

export default useDeletePlannedPhase;
