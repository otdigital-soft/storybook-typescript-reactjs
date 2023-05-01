import { useMutation, useQueryClient } from 'react-query';
import { FormikHelpers } from 'formik';
import studiesServices from 'api/services/studies';
import studiesQueryKeys from 'api/queryKeys/studies';
import { notification } from 'antd';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import useTenant from 'hooks/useTenant';
import { FormValues } from 'pages/Study/StudyElementForm/types';
import {
  emptyValues,
  normalizeFormValues,
} from 'pages/Study/StudyElementForm/utils';
import { schema } from './StudyElementForm/schema';
import { useState } from 'react';
import { StudyElementList } from 'api/schema';

const useCreateStudyElement = (projectId: number) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const { mutateAsync: onCreateStudyElement } = useMutation<
    void,
    Error,
    { values: FormValues; formikHelpers: FormikHelpers<FormValues> }
  >(
    async ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      const createdElement = await studiesServices.createStudyElement(
        tenantId,
        projectId,
        normalizeFormValues(values),
      );
      const studyElementsQueryKey = studiesQueryKeys.studyElements(
        tenantId,
        projectId,
      );
      const studyElementsData = queryClient.getQueryData<StudyElementList[]>(
        studyElementsQueryKey,
      );
      if (studyElementsData) {
        queryClient.setQueryData<StudyElementList[]>(studyElementsQueryKey, [
          ...studyElementsData,
          createdElement,
        ]);
      }
      setIsModalVisible(false);
      notification.success({
        message: 'New chart',
        description: (
          <>
            New chart "<strong>{createdElement.title}</strong>" has been
            created.
          </>
        ),
      });
    },
    {
      onError: (error, { values, formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to create a chart. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        Logger.error(
          `Unable to create a StudyElement in Project(id=${projectId})`,
          error,
          values,
        );
      },
    },
  );

  return {
    isModalVisible,
    setIsModalVisible,
    onCreateStudyElement,
    initialValues: emptyValues,
    schema,
  };
};

export default useCreateStudyElement;
