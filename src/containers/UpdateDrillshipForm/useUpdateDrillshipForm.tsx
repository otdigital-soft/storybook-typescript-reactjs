import { CustomDrillshipDetails } from 'api/schema';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { apiValidationErrors } from 'utils/api';
import { notification } from 'antd';
import { getInitialFormValues, normalizeFormValues } from './utils';
import { publishedRigValidationSchema } from './schema';
import Logger from 'utils/logger';
import { RigType } from 'routes';
import { FormValues } from './form';
import { generateRigPath } from 'routes/utils';
import useInvalidateRigCache from 'hooks/useInvalidateRigCache';

const useUpdateDrillshipForm = (drillshipData: CustomDrillshipDetails) => {
  const { tenantId } = useTenant();
  const { rigId } = useParams<{ rigId: string }>();
  const { projectId } = useParams<{ projectId: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const initialValues = getInitialFormValues(drillshipData);
  const invalidateRigCache = useInvalidateRigCache(
    projectId ? Number(projectId) : undefined,
  );

  const { mutateAsync: updateDrillship, isLoading: isUpdatingDrillship } =
    useMutation<
      CustomDrillshipDetails,
      Error,
      {
        values: FormValues;
        formikHelpers: FormikHelpers<FormValues>;
      }
    >(
      ({ values }) => {
        if (!tenantId) {
          throw new Error('Missing tenant id');
        }

        if (!rigId) {
          throw new Error('Missing rig id');
        }

        const data = normalizeFormValues(values, false);
        return rigsServices.updateDrillship(tenantId, Number(rigId), data);
      },
      {
        onSuccess: async (data) => {
          if (!tenantId) {
            throw new Error('Missing tenant id');
          }

          const customDrillshipQueryKey = rigsQueryKeys.customDrillship(
            Number(tenantId),
            Number(rigId),
          );
          queryClient.setQueryData<CustomDrillshipDetails>(
            customDrillshipQueryKey,
            data,
          );
          await invalidateRigCache();

          notification.success({
            message: 'Saved rig',
            description: (
              <>
                Rig "<strong>{data.name}</strong>" has been saved.
              </>
            ),
          });

          navigate(
            generateRigPath(
              Number(rigId),
              RigType.Drillship,
              projectId ? Number(projectId) : undefined,
            ),
          );
        },
        onError: (error, { formikHelpers }) => {
          const { nonFieldErrors, fieldErrors } = apiValidationErrors(
            error,
            'Unable to update rig. Please try later',
          );

          Logger.error(
            `Unable to update a CustomDrillship(id=${rigId}).`,
            error,
          );
          formikHelpers.setStatus(nonFieldErrors);
          formikHelpers.setErrors(fieldErrors);
        },
      },
    );

  return {
    schema: publishedRigValidationSchema,
    updateDrillship,
    isUpdatingDrillship,
    initialValues,
  };
};

export default useUpdateDrillshipForm;
