import projectsServices from 'api/services/projects';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import { apiValidationErrors } from 'utils/api';
import projectsQueryKeys from 'api/queryKeys/projects';
import { notification } from 'antd';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import Logger from 'utils/logger';
import { schema } from 'containers/PlanForm/schema';
import { FormValues } from 'containers/PlanForm/form';
import {
  emptyFormValues,
  normalizeFormValues,
} from 'containers/PlanForm/utils';
import { CustomRigList, CustomWellList } from 'api/schema';

const useCreatePlan = ({
  projectRigs,
  projectWells,
  projectId,
}: {
  projectId: number;
  projectWells: CustomWellList[];
  projectRigs: CustomRigList[];
}) => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const initialValues: FormValues = emptyFormValues({
    projectWells,
    projectRigs,
  });

  const mutation = useMutation<
    void,
    Error,
    { values: FormValues; formikHelpers: FormikHelpers<FormValues> }
  >(
    async ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      const data = await projectsServices.createPlan(
        tenantId,
        projectId,
        normalizeFormValues(values),
      );
      await queryClient.invalidateQueries(
        projectsQueryKeys.allPlans(tenantId, projectId),
      );
      notification.success({
        message: 'New plan',
        description: (
          <>
            New plan "<strong>{data.name}</strong>" has been created.
          </>
        ),
      });
      navigate(generatePath(routes.project, { projectId: String(projectId) }));
    },
    {
      onError: (error, { values, formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to create a plan. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        Logger.error('Unable to create a plan', error, values);
      },
    },
  );

  return {
    mutation,
    initialValues,
    schema,
  };
};

export default useCreatePlan;
