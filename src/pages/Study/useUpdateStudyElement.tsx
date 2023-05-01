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
  getInitialValues,
  normalizeFormValues,
} from 'pages/Study/StudyElementForm/utils';
import { schema } from './StudyElementForm/schema';
import { useState } from 'react';
import { StudyElement } from 'api/schema';

const useUpdateStudyElement = (projectId: number, element?: StudyElement) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();
  const { mutateAsync: onUpdateStudyElement } = useMutation<
    void,
    Error,
    { values: FormValues; formikHelpers: FormikHelpers<FormValues> }
  >(
    async ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      if (!element) {
        throw new Error('Missing study element');
      }

      const updatedElement = await studiesServices.updateStudyElement(
        tenantId,
        projectId,
        element.id,
        normalizeFormValues(values),
      );

      queryClient.invalidateQueries(
        studiesQueryKeys.studyElement(
          tenantId,
          updatedElement.project,
          updatedElement.id,
        ),
      );
      queryClient.invalidateQueries(
        studiesQueryKeys.studyElements(tenantId, updatedElement.project),
      );
      setIsModalVisible(false);
      notification.success({
        message: 'Saved chart',
        description: (
          <>
            Chart "<strong>{updatedElement.title}</strong>" has been saved.
          </>
        ),
      });
    },
    {
      onError: (error, { values, formikHelpers }) => {
        if (!element) {
          throw new Error('Missing study element.');
        }

        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save a chart. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        Logger.error(
          `Unable to update StudyElement(id=${element.id})`,
          error,
          values,
        );
      },
    },
  );

  return {
    isModalVisible,
    setIsModalVisible,
    onUpdateStudyElement,
    initialValues: element
      ? getInitialValues(element)
      : {
          title: '',
          metric: '',
          plan: null,
          rigs: [],
        },
    schema,
  };
};

export default useUpdateStudyElement;
