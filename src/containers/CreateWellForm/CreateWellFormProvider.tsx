import { createContext, useCallback, useMemo, useState } from 'react';
import Modal from 'components/Modal';
import useTenant from 'hooks/useTenant';
import { useMutation } from 'react-query';
import { CreateCustomWell, CustomWellDetails } from 'api/schema';
import wellsServices from 'api/services/wells';
import Logger from 'utils/logger';
import { notification } from 'antd';
import { WellFormStep, STEPS } from './consts';
import useUpdateWellDetailsCache from 'hooks/useUpdateWellDetailsCache';

export type CreateWellFormStep =
  | WellFormStep.SelectDraft
  | WellFormStep.SelectWell;

export enum DraftType {
  Empty = 'empty',
  Custom = 'custom',
  Concept = 'concept',
}

type CreateWellFormContextType = {
  previous: () => void;
  next: () => void;
  currentStep: CreateWellFormStep;
  draftType: DraftType | undefined;
  steps: { title: string; description: string }[];
  canNext: boolean;
  canPrevious: boolean;
  selectDraftType: (draftType: DraftType) => void;
  selectWell: (wellId: number) => void;
};

export const CreateWellFormContext =
  createContext<CreateWellFormContextType | null>(null);

interface CreateWellFormProviderProps {
  children: JSX.Element;
  projectId?: number;
  onSuccess: (data: CustomWellDetails) => void;
}

const CreateWellFormProvider = ({
  children,
  projectId,
  onSuccess,
}: CreateWellFormProviderProps) => {
  const { tenantId } = useTenant();
  const [currentStep, setCurrentStep] = useState<CreateWellFormStep>(
    WellFormStep.SelectDraft,
  );
  const [draftType, setDraftType] = useState<DraftType>();
  const updateWellDetailsCache = useUpdateWellDetailsCache();

  const { mutate: onCreateDraftWell, isLoading: isCreating } = useMutation<
    CustomWellDetails,
    Error,
    Omit<CreateCustomWell, 'draft' | 'project'>
  >(
    async (data) => {
      if (!tenantId) {
        throw new Error('Missing tenant id.');
      }

      return await wellsServices.createCustomWell(tenantId, {
        ...data,
        draft: true,
        project: projectId || null,
      });
    },
    {
      onSuccess: async (data) => {
        if (!tenantId) {
          throw new Error('Missing tenant id.');
        }

        updateWellDetailsCache(data);

        onSuccess(data);
      },
      onError: (error, data) => {
        notification.error({
          message: 'Well cannot be created right now',
        });
        Logger.error('Unable to create a well.', error, data);
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
      case WellFormStep.SelectDraft:
        return !!draftType && !isCreating;
      case WellFormStep.SelectWell:
        return false;
    }
  }, [currentStep, draftType, isCreating]);

  const canPrevious = useMemo(() => {
    switch (currentStep) {
      case WellFormStep.SelectDraft:
        return false;
      case WellFormStep.SelectWell:
        return !isCreating;
    }
  }, [currentStep, isCreating]);

  const createEmptyDraftWell = useCallback(() => {
    return onCreateDraftWell({
      name: 'Empty draft',
    });
  }, [onCreateDraftWell]);

  const createDraftWellFromConceptWell = useCallback(
    async (wellId: number) => {
      if (!tenantId) {
        throw new Error('Missing tenant id.');
      }

      try {
        const wellData = await wellsServices.conceptWell(tenantId, wellId);
        return onCreateDraftWell({
          ...wellData,
          name: `Draft based on ${wellData.name}`,
        });
      } catch (error) {
        notification.error({
          message: 'Well cannot be created right now',
        });
        Logger.error('Unable to create a well.', error);
      }
    },
    [onCreateDraftWell, tenantId],
  );

  const createDraftWellFromCustomWell = useCallback(
    async (wellId: number) => {
      if (!tenantId) {
        throw new Error('Missing tenant id.');
      }

      try {
        const wellData = await wellsServices.customWell(tenantId, wellId);
        return onCreateDraftWell({
          ...wellData,
          name: `Draft based on ${wellData.name}`,
        });
      } catch (error) {
        notification.error({
          message: 'Well cannot be created right now',
        });
        Logger.error('Unable to create a well.', error);
      }
    },
    [onCreateDraftWell, tenantId],
  );

  const selectDraftType = useCallback(
    (type: DraftType) => {
      switch (type) {
        case DraftType.Empty:
          Modal.confirm({
            title: 'Do you want to continue?',
            content:
              'You will not be able to change the predefined data after this step.',
            onOk: () => {
              createEmptyDraftWell();
            },
          });
          break;
        case DraftType.Concept:
          setDraftType(type);
          setCurrentStep(WellFormStep.SelectWell);
          break;
        case DraftType.Custom:
          setDraftType(type);
          setCurrentStep(WellFormStep.SelectWell);
          break;
      }
    },
    [createEmptyDraftWell],
  );

  const selectWell = useCallback(
    (wellId: number) => {
      Modal.confirm({
        title: 'Do you want to continue?',
        content:
          'You will not be able to change the predefined data after this step.',
        onOk: () => {
          switch (draftType) {
            case DraftType.Custom:
              return createDraftWellFromCustomWell(wellId);
            case DraftType.Concept:
              return createDraftWellFromConceptWell(wellId);
            default:
              throw new Error(`${draftType} is not supported`);
          }
        },
      });
    },
    [createDraftWellFromConceptWell, createDraftWellFromCustomWell, draftType],
  );

  const value = {
    currentStep,
    draftType,
    selectDraftType,
    next,
    previous,
    steps: STEPS,
    canNext,
    canPrevious,
    selectWell,
  };

  return (
    <CreateWellFormContext.Provider value={value}>
      {children}
    </CreateWellFormContext.Provider>
  );
};

export default CreateWellFormProvider;
