import { STEPS, WellFormStep } from 'containers/CreateWellForm/consts';
import { useCallback, useMemo, useState } from 'react';
import { CustomWellDetails } from 'api/schema';
import {
  getInitialValues,
  normalizeFormValues,
} from 'containers/UpdateWellForm/utils';
import { schema as updateWellSchema } from 'containers/UpdateWellForm/schema';
import { updateDraftWellStepSchemaMap as updateDraftWellStepSchema } from './schema';
import { useMutation } from 'react-query';
import wellsServices from 'api/services/wells';
import { notification } from 'antd';
import Logger from 'utils/logger';
import { FormValues } from 'containers/UpdateWellForm/types';
import { FormikHelpers } from 'formik';
import { pick } from 'utils/data';
import { stepFieldMap } from './utils';
import useTenant from 'hooks/useTenant';
import { SubmitType } from 'containers/UpdateDraftWellForm/UpdateDraftWellForm';
import useUpdateWellDetailsCache from 'hooks/useUpdateWellDetailsCache';

export type UpdateDraftWellFormStep =
  | WellFormStep.EnterGeneralInformation
  | WellFormStep.EnterDrillingSettings
  | WellFormStep.EnterAdditionalData;

const useUpdateDraftWellForm = ({
  well,
  onSuccessAdd,
  onSuccessSave,
}: {
  well: CustomWellDetails;
  onSuccessSave: (data: CustomWellDetails) => void;
  onSuccessAdd: (data: CustomWellDetails) => void;
}) => {
  const wellId = well.id;
  const { tenantId } = useTenant();
  const [currentStep, setCurrentStep] = useState<UpdateDraftWellFormStep>(
    WellFormStep.EnterGeneralInformation,
  );
  const initialValues = getInitialValues(well);
  const getValidationSchema = (submitType: SubmitType | undefined) => {
    if (submitType === SubmitType.Add) {
      return updateWellSchema;
    }
    return updateDraftWellStepSchema[currentStep];
  };
  const isLast = currentStep === WellFormStep.EnterAdditionalData;
  const updateWellDetailsCache = useUpdateWellDetailsCache();

  const { mutate: onSaveWell, isLoading: isSaving } = useMutation<
    CustomWellDetails,
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

      const normalizedValues = pick(
        normalizeFormValues(values),
        stepFieldMap[currentStep],
      );
      return wellsServices.updateCustomWell(tenantId, wellId, {
        ...normalizedValues,
        draft: true,
      });
    },
    {
      onSuccess: async (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id.');
        }

        if (canNext) {
          next();
        }

        updateWellDetailsCache(data);
        onSuccessSave(data);
      },
      onError: (error, data) => {
        notification.error({
          message: 'Well cannot be saved right now',
        });
        Logger.error(`Unable to save a CustomWell(id=${wellId})`, error, data);
      },
    },
  );

  const { mutate: onAddWell, isLoading: isAdding } = useMutation<
    CustomWellDetails,
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

      const normalizedValues = normalizeFormValues(values);

      return wellsServices.updateCustomWell(tenantId, wellId, {
        ...normalizedValues,
        draft: false,
      });
    },
    {
      onSuccess: async (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id.');
        }

        notification.success({
          message: 'Added well',
          description: (
            <>
              Well "<strong>{data.name}</strong>" has been added.
            </>
          ),
        });

        updateWellDetailsCache(data);
        onSuccessAdd(data);
      },
      onError: (error, data) => {
        notification.error({
          message: 'Well cannot be added right now',
        });
        Logger.error(`Unable to add a CustomWell(id=${wellId})`, error, data);
      },
    },
  );

  const next = useCallback(() => {
    setCurrentStep((prevStep) => prevStep + 1);
  }, []);

  const previous = useCallback(() => {
    setCurrentStep((prevStep) => prevStep - 1);
  }, []);

  const canNext = useMemo(() => {
    switch (currentStep) {
      case WellFormStep.EnterGeneralInformation:
        return !isSaving;
      case WellFormStep.EnterDrillingSettings:
        return !isSaving;
      case WellFormStep.EnterAdditionalData:
        return false;
    }
  }, [currentStep, isSaving]);

  const canPrevious = useMemo(() => {
    switch (currentStep) {
      case WellFormStep.EnterGeneralInformation:
        return false;
      case WellFormStep.EnterDrillingSettings:
        return !isSaving;
      case WellFormStep.EnterAdditionalData:
        return !isSaving && !isAdding;
    }
  }, [currentStep, isAdding, isSaving]);

  return {
    steps: STEPS,
    currentStep,
    initialValues,
    getValidationSchema,
    onSaveWell,
    isSaving,
    onAddWell,
    isAdding,
    canNext,
    canPrevious,
    previous,
    next,
    isLast,
    setCurrentStep,
  };
};

export default useUpdateDraftWellForm;
