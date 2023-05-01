import { CustomDrillshipDetails } from 'api/schema';
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
import { FormValues } from 'containers/UpdateDrillshipForm/form';
import { notification } from 'antd';
import { RigType } from 'routes';
import useUpdateDraftForm from 'containers/DraftForm/useUpdateDraftForm';
import {
  stepFieldMap,
  stepValidationSchemas,
} from 'containers/UpdateDrillshipDraftForm/utils';
import { publishedRigValidationSchema } from 'containers/UpdateDrillshipForm/schema';
import {
  getInitialFormValues,
  normalizeFormValues,
} from 'containers/UpdateDrillshipForm/utils';
import { useCallback } from 'react';
import useInvalidateDraftRigCache from 'hooks/useInvalidateDraftRigCache';

const useUpdateDrillshipDraftForm = () => {
  const queryClient = useQueryClient();
  const { tenantId } = useTenant();
  const { rigId, projectId } =
    useParams<{ rigId: string; projectId: string }>();
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

  const updateDrillshipCache = useCallback(
    async (data: CustomDrillshipDetails) => {
      if (!tenantId) {
        throw new Error('Missing tenant id.');
      }

      const customDrillshipQueryKey = rigsQueryKeys.customDrillship(
        tenantId,
        data.id,
      );
      queryClient.setQueryData<CustomDrillshipDetails>(
        customDrillshipQueryKey,
        data,
      );
      await invalidateDraftRigCache();
    },
    [invalidateDraftRigCache, queryClient, tenantId],
  );

  const {
    mutateAsync: updateDraftDrillship,
    isLoading: isUpdatingDraftDrillship,
  } = useMutation<
    CustomDrillshipDetails,
    Error,
    {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
    }
  >(
    ({ values }) => {
      if (!tenantId) {
        throw new Error('Missing tenant id.');
      }

      if (!rigId) {
        throw new Error('Missing rig id.');
      }

      const normalizedValues = normalizeFormValues(values, true);
      const data = pick(normalizedValues, stepFieldMap[currentStep]);

      return rigsServices.updateDrillship(tenantId, Number(rigId), data);
    },
    {
      onSuccess: async (data) => {
        await updateDrillshipCache(data);

        if (currentStep !== DraftFormSteps.OPERATION) {
          next();
        }
      },
      onError: (error, { formikHelpers }) => {
        const { nonFieldErrors, fieldErrors } = apiValidationErrors(
          error,
          'Unable to save the rig. Please try later',
        );

        Logger.error(
          `Unable to update a draft CustomDrillship(id=${rigId}).`,
          error,
        );
        if (!nonFieldErrors && fieldErrors) {
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

  const { mutateAsync: publishDrillship, isLoading: isPublishingDrillship } =
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
          throw new Error('Missing tenant id.');
        }

        if (!rigId) {
          throw new Error('Missing rig id.');
        }

        const data = normalizeFormValues(values, false);

        return rigsServices.updateDrillship(tenantId, Number(rigId), data);
      },
      {
        onSuccess: async (data) => {
          await updateDrillshipCache(data);

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
                rigType: RigType.Drillship,
                rigId,
              }),
            );
          } else {
            navigate(
              generatePath(routes.rig, { rigId, rigType: RigType.Drillship }),
            );
          }
        },
        onError: (error, { formikHelpers }) => {
          const { nonFieldErrors, fieldErrors } = apiValidationErrors(
            error,
            'Unable to add the rig. Please try later',
          );

          Logger.error(
            `Unable to publish draft CustomDrillship(id=${rigId}).`,
            error,
          );
          formikHelpers.setStatus(nonFieldErrors);
          formikHelpers.setErrors(fieldErrors);
        },
      },
    );

  const updateDrillship = useCallback(
    async ({
      values,
      draft,
      formikHelpers,
    }: {
      values: FormValues;
      formikHelpers: FormikHelpers<FormValues>;
      draft: boolean;
    }) => {
      if (draft) {
        return updateDraftDrillship({ values, formikHelpers });
      } else {
        return publishDrillship({ values, formikHelpers });
      }
    },
    [publishDrillship, updateDraftDrillship],
  );
  const isUpdatingDrillship = isPublishingDrillship || isUpdatingDraftDrillship;

  return {
    getValidationSchema,
    getInitialValues: getInitialFormValues,
    currentStep,
    steps,
    next,
    previous,
    isNextAllowed,
    isPreviousAllowed,
    updateDrillship,
    isUpdatingDrillship,
    setCurrentStep,
  };
};

export default useUpdateDrillshipDraftForm;
