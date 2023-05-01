import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import studiesServices from 'api/services/studies';
import studiesQueryKeys from 'api/queryKeys/studies';
import { notification } from 'antd';
import Logger from 'utils/logger';
import { useCallback } from 'react';
import Modal from 'components/Modal';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useTheme } from 'styled-components';
import { StudyElementList } from 'api/schema';

const useDeleteStudyElement = (
  projectId: number,
  element: StudyElementList,
) => {
  const { colors } = useTheme();
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  const { mutate: deleteStudyElement } = useMutation<void, Error, void>(
    () => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return studiesServices.deleteStudyElement(
        tenantId,
        projectId,
        element.id,
      );
    },
    {
      onSuccess: async () => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        notification.success({
          message: 'Deleted chart',
          description: (
            <>
              Chart "<strong>{element.title}</strong>" has been deleted.
            </>
          ),
        });
        const studyElementsQueryKey = studiesQueryKeys.studyElements(
          tenantId,
          projectId,
        );
        const studyElementsData = queryClient.getQueryData<StudyElementList[]>(
          studyElementsQueryKey,
        );
        if (studyElementsData) {
          queryClient.setQueryData<StudyElementList[]>(
            studyElementsQueryKey,
            studyElementsData
              .filter((oldStudyElement) => oldStudyElement.id !== element.id)
              .map((oldStudyElement) => {
                if (oldStudyElement.order > element.order) {
                  return {
                    ...oldStudyElement,
                    order: oldStudyElement.order - 1,
                  };
                } else {
                  return oldStudyElement;
                }
              }),
          );
        }
      },
      onError: (e) => {
        notification.error({
          message: 'Unable to delete chart. Please try later.',
        });
        Logger.error(`Unable to delete StudyElement(id=${element.id})`, e);
      },
    },
  );
  return useCallback(() => {
    Modal.confirm({
      title: 'Delete chart',
      content: (
        <>
          Are you sure you want to delete <strong>{element.title}</strong>{' '}
          chart?
        </>
      ),
      icon: <CloseCircleOutlined style={{ color: colors.red[6] }} />,
      okButtonProps: {
        danger: true,
      },
      okText: 'Delete',
      onOk: () => {
        deleteStudyElement();
      },
    });
  }, [colors.red, deleteStudyElement, element.title]);
};

export default useDeleteStudyElement;
