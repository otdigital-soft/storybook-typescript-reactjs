import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import studiesServices from 'api/services/studies';
import studiesQueryKeys from 'api/queryKeys/studies';
import { notification } from 'antd';
import Logger from 'utils/logger';
import { useCallback } from 'react';
import {
  StudyElementList,
  SwappedStudyElements,
  SwapStudyElements,
} from 'api/schema';

const useSwapStudyElements = ({
  element,
  nextElement,
  prevElement,
  projectId,
}: {
  projectId: number;
  element: StudyElementList;
  prevElement: StudyElementList | undefined;
  nextElement: StudyElementList | undefined;
}) => {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  const { mutate: onSwapStudyElements } = useMutation<
    SwappedStudyElements,
    Error,
    SwapStudyElements
  >(
    ({ first_element, second_element }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }
      return studiesServices.swapStudyElements(tenantId, projectId, {
        first_element,
        second_element,
      });
    },
    {
      onSuccess: async ({ first_element, second_element }) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
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
            studyElementsData.map((oldStudyElement) => {
              if (oldStudyElement.id === first_element.id) {
                return second_element;
              }
              if (oldStudyElement.id == second_element.id) {
                return first_element;
              }
              return oldStudyElement;
            }),
          );
        }
      },
      onError: (e, { first_element, second_element }) => {
        notification.error({
          message: 'Unable to move chart. Please try later.',
        });
        Logger.error(
          `Unable to swap StudyElement(id=${first_element}) and StudyElement(id=${second_element})`,
          e,
        );
      },
    },
  );
  const canMoveUp = !!prevElement;
  const canMoveDown = !!nextElement;
  const onMoveUp = useCallback(() => {
    if (!prevElement) {
      throw new Error('Chart cannot be moved up');
    }
    onSwapStudyElements({
      first_element: prevElement.id,
      second_element: element.id,
    });
  }, [element, onSwapStudyElements, prevElement]);
  const onMoveDown = useCallback(() => {
    if (!nextElement) {
      throw new Error('Chart cannot be moved down');
    }
    onSwapStudyElements({
      first_element: element.id,
      second_element: nextElement.id,
    });
  }, [element, nextElement, onSwapStudyElements]);

  return {
    canMoveUp,
    canMoveDown,
    onMoveDown,
    onMoveUp,
  };
};

export default useSwapStudyElements;
