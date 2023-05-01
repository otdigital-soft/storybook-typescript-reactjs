import { CustomSemiRigDetails } from 'api/schema';
import rigsServices from 'api/services/rigs';
import rigsQueryKeys from 'api/queryKeys/rigs';
import { CREATE_RIG_FORM_STEPS as steps, DraftFormSteps } from 'consts/rigs';
import { FormikHelpers } from 'formik';
import useTenant from 'hooks/useTenant';
import { useMutation, useQueryClient } from 'react-query';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import routes from 'routes';
import { apiValidationErrors } from 'utils/api';
import { pick } from 'utils/data';
import Logger from 'utils/logger';
import {
  normalizeValues,
  getInitialValues,
  FormValues,
} from 'containers/UpdateSemiForm';
import { notification } from 'antd';
import { RigType } from 'routes';
import useUpdateDraftForm from 'containers/DraftForm/useUpdateDraftForm';
import useInvalidateDraftRigCache from 'hooks/useInvalidateDraftRigCache';
import { stepFieldMap, stepValidationSchemas } from './utils';
import { publishedRigValidationSchema } from 'containers/UpdateSemiForm/schema';

const useUpdateSemiDraftForm = () => {
  const { tenantId } = useTenant();
  const { rigId, projectId } =
    useParams<{ rigId: string; projectId: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    previous,
    isPreviousAllowed,
    isNextAllowed,
    next,
    currentStep,
    setCurrentStep,
  } = useUpdateDraftForm();
  const invalidateDraftRigCache = useInvalidateDraftRigCache(
    projectId ? Number(projectId) : undefined,
  );

  const getValidationSchema = (draft?: boolean) => {
    if (draft) {
      return stepValidationSchemas[currentStep];
    } else {
      return publishedRigValidationSchema;
    }
  };

  const { mutateAsync: onUpdateSemiRig, isLoading: isOnUpdateSemiRigLoading } =
    useMutation<
      CustomSemiRigDetails,
      Error,
      {
        values: FormValues;
        formikHelpers: FormikHelpers<FormValues>;
        draft: boolean;
      }
    >(
      ({ values, draft }) => {
        if (!tenantId) {
          throw new Error('Missing tenant id.');
        }

        if (!rigId) {
          throw new Error('Missing rig id.');
        }

        const normalizedValues = normalizeValues(values, draft);
        const data = draft
          ? pick(normalizedValues, stepFieldMap[currentStep])
          : normalizedValues;

        return rigsServices.updateSemi(tenantId, Number(rigId), data);
      },
      {
        onSuccess: async (data, { draft }) => {
          if (!tenantId) {
            throw new Error('Missing tenant id.');
          }

          const customSemiQueryKey = rigsQueryKeys.customSemi(
            tenantId,
            data.id,
          );
          queryClient.setQueryData<CustomSemiRigDetails>(
            customSemiQueryKey,
            data,
          );
          await invalidateDraftRigCache();

          if (!draft) {
            notification.success({
              message: 'Added rig',
              description: (
                <>
                  Rig "<strong>{data.name}</strong>" has been added.
                </>
              ),
            });
            if (projectId) {
              navigate(
                generatePath(routes.projectRig, {
                  projectId,
                  rigType: RigType.Semi,
                  rigId,
                }),
              );
            } else {
              navigate(
                generatePath(routes.rig, { rigId, rigType: RigType.Semi }),
              );
            }
          }

          if (currentStep !== DraftFormSteps.OPERATION) {
            next();
          }
        },
        onError: (error, { draft, formikHelpers }) => {
          const { nonFieldErrors, fieldErrors } = apiValidationErrors(
            error,
            'Unable to update the rig. Please try later',
          );

          Logger.error(
            `Unable to update a draft CustomSemiRig(id=${rigId}).`,
            error,
          );
          if (!nonFieldErrors && draft && fieldErrors) {
            formikHelpers.setStatus(
              'All data needs to be provided to add a rig.',
            );
          } else {
            formikHelpers.setStatus(nonFieldErrors);
          }
          formikHelpers.setErrors(fieldErrors);
        },
      },
    );

  return {
    getValidationSchema,
    getInitialValues,
    currentStep,
    steps,
    next,
    previous,
    isNextAllowed,
    isPreviousAllowed,
    onUpdateSemiRig,
    isLoading: isOnUpdateSemiRigLoading,
    setCurrentStep,
  };
};

export default useUpdateSemiDraftForm;
