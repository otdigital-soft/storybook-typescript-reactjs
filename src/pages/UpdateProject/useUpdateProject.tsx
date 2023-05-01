import { useMutation, useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';
import { FormikHelpers } from 'formik';
import { FormValues } from 'containers/ProjectForm/form';
import { schema } from 'containers/ProjectForm/schema';
import { generatePath, useNavigate } from 'react-router-dom';
import projectsServices from 'api/services/projects';
import projectsQueryKeys from 'api/queryKeys/projects';
import { notification } from 'antd';
import routes from 'routes';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import { ProjectDetails } from 'api/schema';
import {
  emptyFormValues,
  normalizeFormValues,
} from 'containers/ProjectForm/utils';
import { useCallback } from 'react';
import { getInitialValues } from './utils';

const useUpdateProject = (
  projectId: number,
  projectData: ProjectDetails | undefined,
) => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const initialValues = getInitialValues(projectData);

  const mutation = useMutation<
    void,
    Error,
    { values: FormValues; formikHelpers: FormikHelpers<FormValues> }
  >(
    async ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      const data = await projectsServices.updateProject(
        tenantId,
        projectId,
        normalizeFormValues(values),
      );
      await queryClient.invalidateQueries(
        projectsQueryKeys.allProjects(tenantId),
      );
      notification.success({
        message: 'Saved project',
        description: (
          <>
            Project "<strong>{data.name}</strong>" has been saved.
          </>
        ),
      });
      navigate(generatePath(routes.project, { projectId: String(projectId) }));
    },
    {
      onError: (error, { values, formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save project. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        Logger.error(
          `Unable to update Project(id=${projectId})`,
          error,
          values,
        );
      },
    },
  );

  const onClear = useCallback((formikHelpers: FormikHelpers<FormValues>) => {
    formikHelpers.resetForm({ values: emptyFormValues });
  }, []);

  return {
    mutation,
    initialValues,
    schema,
    onClear,
  };
};

export default useUpdateProject;
