import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import projectsServices from 'api/services/projects';
import { notification } from 'antd';
import Logger from 'utils/logger';
import projectsQueryKeys from 'api/queryKeys/projects';
import studiesQueryKeys from 'api/queryKeys/studies';
import { PlanList } from 'api/schema';

const useDeletePlan = (projectId: number) => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  return useMutation<void, Error, PlanList>(
    (plan) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return projectsServices.deletePlan(tenantId, projectId, plan.id);
    },
    {
      onSuccess: async (data, plan) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        notification.success({
          message: 'Deleted plan',
          description: (
            <>
              Plan "<strong>{plan.name}</strong>" has been deleted.
            </>
          ),
        });
        await queryClient.invalidateQueries(
          projectsQueryKeys.allPlans(tenantId, projectId),
        );
        await queryClient.invalidateQueries(
          studiesQueryKeys.studyElements(tenantId, projectId),
        );
      },
      onError: (e, plan) => {
        notification.error({
          message: 'Unable to delete plan. Please try later.',
        });
        Logger.error(`Unable to delete Plan(id=${plan.id})`, e);
      },
    },
  );
};

export default useDeletePlan;
