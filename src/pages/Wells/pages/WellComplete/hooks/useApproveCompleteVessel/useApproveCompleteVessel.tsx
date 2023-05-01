import { notification } from 'antd';
import { TenantsService, WellPlannerDetails } from 'api/schema';
import { AxiosError } from 'axios';
import useTenant from 'hooks/useTenant';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useMutation } from 'react-query';
import Logger from 'utils/logger';

const useApproveCompleteVessel = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);

  return useMutation<
    WellPlannerDetails,
    AxiosError,
    {
      vesselTypes: string[];
      vesselUseIds: number[];
      onSuccess?: () => void;
    }
  >(
    async ({ vesselUseIds }) => {
      const { data } =
        await TenantsService.tenantsWellsPlannersCompleteVesselUsesApproveUpdate(
          Number(tenantId),
          wellPlanId,
          {
            complete_vessel_uses: vesselUseIds,
          },
        );

      return data;
    },
    {
      onSuccess: (data, { vesselTypes, onSuccess }) => {
        notification.success({
          message: 'Approved vessels',
          description:
            vesselTypes.length > 1 ? (
              <>
                Vessels <strong>{vesselTypes.join(', ')}</strong> have been{' '}
                approved.
              </>
            ) : (
              <>
                Vessel <strong>{vesselTypes[0]}</strong> has been approved.
              </>
            ),
        });
        setWellPlanData(data);

        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error, { vesselUseIds }) => {
        notification.error({
          message: 'Vessels cannot be approved right now. Please try later.',
        });
        Logger.error(
          `Unable to approve a CompleteVesselUse(id__in=${vesselUseIds}).`,
          error,
        );
      },
    },
  );
};

export default useApproveCompleteVessel;
