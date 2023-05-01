import { FormValues, schema } from 'containers/EMPForm/EMPBaseForm';
import { ConceptEMPElement, EMP } from 'api/schema';
import { emptyFormValues, normalizeFormValues } from 'containers/EMPForm/utils';
import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import useTenant from 'hooks/useTenant';
import { FormikHelpers } from 'formik';
import projectsServices from 'api/services/projects';
import projectsQueryKeys from 'api/queryKeys/projects';
import { notification } from 'antd';
import routes from 'routes';
import { apiValidationErrors } from 'utils/api';
import Logger from 'utils/logger';
import { RigType } from 'routes';

const useCreateEMP = ({
  conceptEMPElements,
  projectId,
  rigId,
  rigType,
}: {
  projectId: number;
  rigId: number;
  rigType: RigType;
  conceptEMPElements: ConceptEMPElement[] | undefined;
}) => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  const navigate = useNavigate();
  const initialValues = emptyFormValues(conceptEMPElements || []);
  const mutation = useMutation<
    EMP,
    Error,
    { values: FormValues; formikHelpers: FormikHelpers<FormValues> }
  >(
    async ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id');
      }

      return await projectsServices.createEMP({
        tenantId,
        projectId,
        rigType,
        rigId,
        data: normalizeFormValues(values),
      });
    },
    {
      onSuccess: async (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }
        await queryClient.invalidateQueries(
          projectsQueryKeys.allProjectRigs(tenantId, projectId),
        );
        notification.success({
          message: 'Added EMP',
          description: (
            <>
              EMP "<strong>{data.name}</strong>" has been added.
            </>
          ),
        });
        navigate(
          generatePath(routes.project, { projectId: String(projectId) }),
        );
      },
      onError: (error, { values, formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to add an EMP. Please try later.',
        );
        formikHelpers.setStatus(nonFieldErrors);
        formikHelpers.setErrors(fieldErrors);
        Logger.error('Unable to create an EMP', error, values);
      },
    },
  );

  return {
    mutation,
    initialValues,
    schema,
  };
};

export default useCreateEMP;
