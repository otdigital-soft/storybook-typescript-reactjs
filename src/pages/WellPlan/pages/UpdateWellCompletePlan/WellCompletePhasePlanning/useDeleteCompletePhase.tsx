import { CloseCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import { TenantsService } from 'api/schema';
import Modal from 'components/Modal';
import useTenant from 'hooks/useTenant';
import useInvalidateWellCompletePlanCO2Cache from 'pages/WellPlan/hooks/useInvalidateWellCompletePlanCO2Cache';
import useWellPlan from 'pages/WellPlan/hooks/useWellPlan';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { useTheme } from 'styled-components';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';

type DeleteCompletePhaseParams = {
  wellPlanId: number;
  wellPlanPhaseId: number;
  wellPlanPhaseName: string;
  onDelete: () => void;
};

const useDeleteCompletePhase = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const { data: wellPlanData } = useWellPlan(wellPlanId);
  const { invalidateWellCompletePlanCO2Cache } =
    useInvalidateWellCompletePlanCO2Cache();
  const confirmDeleteCompletePhase = useCallback(
    ({ wellPlanPhaseName }: DeleteCompletePhaseParams, onOk: () => void) =>
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

  const { mutate: deleteCompletePhase, isLoading: isDeletingCompletePhase } =
    useMutation<void, Error, DeleteCompletePhaseParams>(
      async ({ wellPlanPhaseId }) => {
        const { data } =
          await TenantsService.tenantsWellsPlannersCompleteStepsDeleteDestroy(
            Number(tenantId),
            wellPlanPhaseId,
            wellPlanId,
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
              complete_steps: wellPlanData.complete_steps.filter(
                (step) => step.id !== wellPlanPhaseId,
              ),
            });
          }
          await invalidateWellCompletePlanCO2Cache(wellPlanId);
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
            `Unable to delete a WellPlannerCompleteStep(id=${data.wellPlanPhaseId}).`,
            error,
            data,
          );
        },
      },
    );

  const onDeleteCompletePhase = useCallback(
    (params: DeleteCompletePhaseParams) => {
      confirmDeleteCompletePhase(params, () => deleteCompletePhase(params));
    },
    [confirmDeleteCompletePhase, deleteCompletePhase],
  );
  return {
    onDeleteCompletePhase,
    isDeletingCompletePhase,
  };
};

export default useDeleteCompletePhase;
