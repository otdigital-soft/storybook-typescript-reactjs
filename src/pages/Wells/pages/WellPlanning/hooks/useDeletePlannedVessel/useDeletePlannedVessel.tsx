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

type DeletePlannedVesselParams = {
  vesselUseId: number;
  vesselType: string;
  onDelete: () => void;
};

const useDeletePlannedVessel = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const {
    invalidateWellPlannedPlanCO2Cache,
    invalidateWellPlannedStepsCO2Cache,
  } = useInvalidateWellPlannedPlanCO2Cache();

  const confirmDeletePlannedVessel = useCallback(
    ({ vesselType }: DeletePlannedVesselParams, onOk: () => void) =>
      Modal.confirm({
        title: 'Delete vessel',
        content: (
          <>
            Are you sure you want to delete <strong>{vesselType}</strong>{' '}
            vessel?
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

  const { mutate: deletePlannedVessel, isLoading: isDeletingPlannedVessel } =
    useMutation<WellPlannerDetails, Error, DeletePlannedVesselParams>(
      async ({ vesselUseId }) => {
        const { data } =
          await TenantsService.tenantsEmissionsWellsPlannedVesselUsesDeleteDestroy(
            vesselUseId,
            Number(tenantId),
            wellPlanId,
          );
        return data;
      },
      {
        onSuccess: async (data, { vesselType, onDelete }) => {
          notification.success({
            message: 'Deleted vessel',
            description: (
              <>
                Vessel <strong>{vesselType}</strong> has been deleted.
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
            'Vessel cannot be deleted right now. Please try later.',
          );
          notification.error({
            message: nonFieldErrors,
          });
          Logger.error(
            `Unable to delete a PlannedVesselUse(id=${data.vesselUseId}).`,
            error,
            data,
          );
        },
      },
    );

  const onDeletePlannedVessel = useCallback(
    (params: DeletePlannedVesselParams) => {
      confirmDeletePlannedVessel(params, () => deletePlannedVessel(params));
    },
    [confirmDeletePlannedVessel, deletePlannedVessel],
  );
  return {
    onDeletePlannedVessel,
    isDeletingPlannedVessel,
  };
};

export default useDeletePlannedVessel;
