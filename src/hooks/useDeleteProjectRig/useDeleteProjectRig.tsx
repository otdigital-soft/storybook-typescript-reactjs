import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import rigsQueryKeys from 'api/queryKeys/rigs';
import projectsQueryKeys from 'api/queryKeys/projects';
import studiesQueryKeys from 'api/queryKeys/studies';
import routes from 'routes';
import { notification } from 'antd';
import useConfirmDeleteRig from 'hooks/useConfirmDeleteRig';
import { RigTypeEnum } from 'api/schema';
import Logger from 'utils/logger';
import { useCallback } from 'react';
import { deleteRigFactory } from 'hooks/useDeleteRig/useDeleteRig';
import { apiValidationErrors } from 'utils/api';

const useDeleteProjectRig = () => {
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { confirmDeleteRig } = useConfirmDeleteRig();

  const { mutate: deleteRig } = useMutation<
    void,
    Error,
    {
      projectId: number;
      rigId: number;
      rigName: string;
      rigType: RigTypeEnum;
    }
  >(
    async ({ rigId, rigType }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      return deleteRigFactory({
        rigId,
        rigType,
        tenantId,
      });
    },
    {
      onSuccess: async (_, { projectId, rigName }) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        navigate(
          generatePath(routes.project, { projectId: String(projectId) }),
        );
        notification.success({
          message: 'Deleted rig',
          description: (
            <>
              Rig "<strong>{rigName}</strong>" has been deleted.
            </>
          ),
        });

        await Promise.all([
          queryClient.invalidateQueries(rigsQueryKeys.allCustomRigs(tenantId)),
          queryClient.invalidateQueries(
            projectsQueryKeys.allProjectRigs(tenantId, projectId),
          ),
          queryClient.invalidateQueries(
            projectsQueryKeys.allElements(tenantId),
          ),
          queryClient.invalidateQueries(
            studiesQueryKeys.studyElements(tenantId, projectId),
          ),
        ]);
      },
      onError: (error, data) => {
        const { nonFieldErrors } = apiValidationErrors(
          error,
          'Rig cannot be deleted right now.',
        );
        notification.error({
          message: nonFieldErrors,
        });
        Logger.error('Unable to delete a rig.', error, data);
      },
    },
  );

  return useCallback(
    (params: {
      projectId: number;
      rigId: number;
      rigName: string;
      rigType: RigTypeEnum;
    }) => {
      confirmDeleteRig(params.rigName, () => deleteRig(params));
    },
    [confirmDeleteRig, deleteRig],
  );
};

export default useDeleteProjectRig;
