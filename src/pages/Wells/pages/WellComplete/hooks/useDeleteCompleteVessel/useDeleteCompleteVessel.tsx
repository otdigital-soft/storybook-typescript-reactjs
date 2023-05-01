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

type DeleteCompleteVesselParams = {
  vesselUseId: number;
  vesselType: string;
  onDelete: () => void;
};

const useDeleteCompleteVessel = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { colors } = useTheme();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);
  const { invalidateWellCompletePlanCO2CacheWithoutMeasurements } =
    useInvalidateWellCompletePlanCO2Cache();
  const confirmDeleteCompleteVessel = useCallback(
    ({ vesselType }: DeleteCompleteVesselParams, onOk: () => void) =>
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

  const { mutate: deleteCompleteVessel, isLoading: isDeletingCompleteVessel } =
    useMutation<WellPlannerDetails, Error, DeleteCompleteVesselParams>(
      async ({ vesselUseId }) => {
        const { data } =
          await TenantsService.tenantsEmissionsWellsCompleteVesselUsesDeleteDestroy(
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
          await invalidateWellCompletePlanCO2CacheWithoutMeasurements(data.id);
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
            `Unable to delete a CompleteVesselUse(id=${data.vesselUseId}).`,
            error,
            data,
          );
        },
      },
    );

  const onDeleteCompleteVessel = useCallback(
    (params: DeleteCompleteVesselParams) => {
      confirmDeleteCompleteVessel(params, () => deleteCompleteVessel(params));
    },
    [confirmDeleteCompleteVessel, deleteCompleteVessel],
  );

  return {
    onDeleteCompleteVessel,
    isDeletingCompleteVessel,
  };
};

export default useDeleteCompleteVessel;
