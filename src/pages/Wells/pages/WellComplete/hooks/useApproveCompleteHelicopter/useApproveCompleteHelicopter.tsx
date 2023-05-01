import { notification } from 'antd';
import { TenantsService, WellPlannerDetails } from 'api/schema';
import { AxiosError } from 'axios';
import useTenant from 'hooks/useTenant';
import useWellPlanCache from 'pages/WellPlan/hooks/useWellPlanCache';
import { useMutation } from 'react-query';
import Logger from 'utils/logger';

const useApproveCompleteHelicopter = (wellPlanId: number) => {
  const { tenantId } = useTenant();
  const { setWellPlanData } = useWellPlanCache(wellPlanId);

  return useMutation<
    WellPlannerDetails,
    AxiosError,
    {
      helicopterTypes: string[];
      helicopterUseIds: number[];
      onSuccess?: () => void;
    }
  >(
    async ({ helicopterUseIds }) => {
      const { data } =
        await TenantsService.tenantsWellsPlannersCompleteHelicopterUsesApproveUpdate(
          Number(tenantId),
          wellPlanId,
          {
            complete_helicopter_uses: helicopterUseIds,
          },
        );

      return data;
    },
    {
      onSuccess: (data, { helicopterTypes, onSuccess }) => {
        notification.success({
          message: 'Approved helicopters',
          description:
            helicopterTypes.length > 1 ? (
              <>
                Helicopters <strong>{helicopterTypes.join(', ')}</strong> have{' '}
                been approved.
              </>
            ) : (
              <>
                Helicopter <strong>{helicopterTypes[0]}</strong> has been{' '}
                approved.
              </>
            ),
        });
        setWellPlanData(data);

        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (error, { helicopterUseIds }) => {
        notification.error({
          message:
            'Helicopters cannot be approved right now. Please try later.',
        });
        Logger.error(
          `Unable to approve a CompleteHelicopterUse(id__in=${helicopterUseIds}).`,
          error,
        );
      },
    },
  );
};

export default useApproveCompleteHelicopter;
