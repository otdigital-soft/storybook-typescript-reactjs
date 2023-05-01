import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import projectsServices from 'api/services/projects';
import projectsQueryKeys from 'api/queryKeys/projects';
import routes from 'routes';
import { RigType } from 'routes';
import { notification } from 'antd';
import Logger from 'utils/logger';
import { generatePath, useNavigate } from 'react-router-dom';

const useDeleteEMP = ({
  empName,
  rigId,
  rigType,
  projectId,
}: {
  projectId: number;
  rigType: RigType;
  rigId: number;
  empName: string;
}) => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<void, Error, void>(
    async () => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      return await projectsServices.deleteEMP({
        tenantId,
        projectId,
        rigId,
        rigType,
      });
    },
    {
      onSuccess: async () => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        navigate(
          generatePath(routes.project, { projectId: String(projectId) }),
        );
        notification.success({
          message: 'Deleted EMP',
          description: (
            <>
              EMP "<strong>{empName}</strong>" has been deleted.
            </>
          ),
        });
        await queryClient.invalidateQueries(
          projectsQueryKeys.allProjectRigs(tenantId, projectId),
        );
      },
      onError: (e) => {
        notification.error({
          message: 'Unable to delete EMP. Please try later.',
        });
        Logger.error(
          `Unable to delete EMP for Rig(id=${rigId}, type=${rigType})`,
          e,
        );
      },
    },
  );
};

export default useDeleteEMP;
