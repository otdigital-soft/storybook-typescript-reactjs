import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import projectsServices from 'api/services/projects';
import { notification } from 'antd';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { PrepareTab } from 'pages/Prepare/Prepare';
import Logger from 'utils/logger';
import projectsQueryKeys from 'api/queryKeys/projects';
import rigsQueryKeys from 'api/queryKeys/rigs';
import wellsQueryKeys from 'api/queryKeys/wells';
import Modal from 'components/Modal';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useTheme } from 'styled-components';
import { useCallback } from 'react';

const useDeleteProject = (projectId: number, projectName: string) => {
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { colors } = useTheme();

  const { mutate: deleteProject } = useMutation(
    () => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return projectsServices.deleteProject(tenantId, projectId);
    },
    {
      onSuccess: async () => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        navigate(
          generatePath(routes.prepareTab, { tabId: PrepareTab.Projects }),
        );
        notification.success({
          message: 'Deleted project',
          description: (
            <>
              Project "<strong>{projectName}</strong>" has been deleted.
            </>
          ),
        });
        await Promise.all([
          queryClient.invalidateQueries(
            projectsQueryKeys.allProjects(tenantId),
          ),
          queryClient.invalidateQueries(
            projectsQueryKeys.allElements(tenantId),
          ),
          queryClient.invalidateQueries(rigsQueryKeys.allCustomRigs(tenantId)),
          queryClient.invalidateQueries(
            wellsQueryKeys.allCustomWells(tenantId),
          ),
        ]);
      },
      onError: (e) => {
        notification.error({
          message: 'Unable to delete project. Please try later.',
        });
        Logger.error(`Unable to delete Project(id=${projectId})`, e);
      },
    },
  );
  return useCallback(() => {
    Modal.confirm({
      title: 'Delete project',
      content: (
        <>
          Are you sure you want to delete <strong>{projectName}</strong>{' '}
          project?
        </>
      ),
      icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
      okButtonProps: {
        danger: true,
      },
      okText: 'Delete',
      onOk: () => {
        deleteProject();
      },
    });
  }, [colors.red, deleteProject, projectName]);
};

export default useDeleteProject;
