import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';
import projectsQueryKeys from 'api/queryKeys/projects';
import routes from 'routes';
import { notification } from 'antd';
import useConfirmDeleteRig from 'hooks/useConfirmDeleteRig';
import { RigTypeEnum } from 'api/schema';
import Logger from 'utils/logger';
import { useCallback } from 'react';

export const deleteRigFactory = async ({
  rigType,
  rigId,
  tenantId,
}: {
  rigType: RigTypeEnum;
  tenantId: number;
  rigId: number;
}) => {
  switch (rigType) {
    case RigTypeEnum.JACKUP:
      return await rigsServices.deleteJackup(tenantId, rigId);
    case RigTypeEnum.SEMI:
      return await rigsServices.deleteSemi(tenantId, rigId);
    case RigTypeEnum.DRILLSHIP:
      return await rigsServices.deleteDrillship(tenantId, rigId);
    default:
      Logger.error(`Unable to delete rig. Unknown rig type: ${rigType}`);
      return undefined;
  }
};

const useDeleteRig = () => {
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { confirmDeleteRig } = useConfirmDeleteRig();

  const { mutate: deleteRig } = useMutation<
    void,
    Error,
    {
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
      onSuccess: async (_, { rigName }) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        navigate(generatePath(routes.rigs));
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
            projectsQueryKeys.allElements(tenantId),
          ),
        ]);
      },
      onError: (error, data) => {
        notification.error({
          message: 'Rig cannot be deleted right now',
        });
        Logger.error('Unable to delete a rig.', error, data);
      },
    },
  );

  return useCallback(
    (params: { rigId: number; rigName: string; rigType: RigTypeEnum }) => {
      confirmDeleteRig(params.rigName, () => deleteRig(params));
    },
    [confirmDeleteRig, deleteRig],
  );
};

export default useDeleteRig;
