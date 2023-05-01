import projectsServices from 'api/services/projects';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import projectsQueryKeys from 'api/queryKeys/projects';
import { notification } from 'antd';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { PrepareTab } from 'pages/Prepare/Prepare';
import Logger from 'utils/logger';
import { schema } from 'containers/ProjectForm/schema';
import { FormValues } from 'containers/ProjectForm/form';
import {
  emptyFormValues,
  normalizeFormValues,
} from 'containers/ProjectForm/utils';

const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  const navigate = useNavigate();

  const mutation = useMutation<
    void,
    Error,
    { values: FormValues; formikHelpers: FormikHelpers<FormValues> }
  >(
    async ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      const data = await projectsServices.createProject(
        tenantId,
        normalizeFormValues(values),
      );
      await queryClient.invalidateQueries(
        projectsQueryKeys.allProjects(tenantId),
      );
      notification.success({
        message: 'New project',
        description: (
          <>
            New project "<strong>{data.name}</strong>" has been created.
          </>
        ),
      });
      navigate(generatePath(routes.prepareTab, { tabId: PrepareTab.Projects }));
    },
    {
      onError: (error, { values, formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to create a project. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        Logger.error('Unable to create a project', error, values);
      },
    },
  );

  return {
    mutation,
    initialValues: emptyFormValues,
    schema,
  };
};

export default useCreateProject;
