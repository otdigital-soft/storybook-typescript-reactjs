import Modal from 'components/Modal';
import { CREATE_RIG_FORM_STEPS as steps } from 'consts/rigs';
import { useState, useEffect, createContext } from 'react';
import useCreateRigDraft from './useCreateRigDraft';

export enum CreateRigFormSteps {
  RigType = 0,
  DraftType = 1,
  SelectRig = 2,
}

export enum CreateRigType {
  Jackup = 'jackup',
  Semi = 'semi',
  Drillship = 'drillship',
}

export enum CreateRigDraftType {
  Custom = 'custom',
  Concept = 'concept',
}

type CreateRigFormType = {
  isNextDisabled: boolean;
  onRigTypeChange: (rigType: CreateRigType) => void;
  onDraftTypeChange: (draftType?: CreateRigDraftType) => void;
  onRigSelect: (rigId: number) => void;
  previous: () => void;
  next: () => void;
  currentStep: CreateRigFormSteps;
  steps: { title: string; description: string }[];
  draftType?: CreateRigDraftType;
  rigType?: CreateRigType;
  isCreatingRigDraft: boolean;
  setCurrentStep: (index: number) => void;
};

interface CreateRigFormProviderProps {
  children: JSX.Element;
}

export const CreateRigFormContext = createContext<CreateRigFormType | null>(
  null,
);

const CreateRigFormProvider = ({ children }: CreateRigFormProviderProps) => {
  const [currentStep, setCurrentStep] = useState(CreateRigFormSteps.RigType);
  const [rigType, setRigType] = useState<CreateRigType>();
  const [draftType, setDraftType] = useState<CreateRigDraftType>();
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const { onCreateRigDraft, isCreatingRigDraft } = useCreateRigDraft();

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const previous = () => {
    setCurrentStep(currentStep - 1);
  };

  const onRigTypeChange = (value: CreateRigType) => {
    setRigType(value);
    next();
  };

  const onDraftTypeChange = (value?: CreateRigDraftType) => {
    if (!value) {
      onFinished();
    } else {
      setDraftType(value);
      next();
    }
  };

  const onRigSelect = (rigId: number) => {
    onFinished(rigId);
  };

  const onFinished = (rigId?: number) => {
    Modal.confirm({
      title: 'Do you want to continue?',
      content:
        'You will not be able to change the rig type and predefined data after this step.',
      onOk: () => {
        if (!rigType) {
          throw new Error('Unable to create draft rig without rig type');
        }
        onCreateRigDraft(rigType, draftType, rigId);
      },
    });
  };

  useEffect(() => {
    switch (currentStep) {
      case CreateRigFormSteps.RigType:
        setIsNextDisabled(rigType === undefined);
        break;
      case CreateRigFormSteps.DraftType:
        setIsNextDisabled(draftType === undefined);
        break;
      case CreateRigFormSteps.SelectRig:
        setIsNextDisabled(true);
        break;
      default:
        break;
    }
  }, [currentStep, draftType, rigType]);

  const value = {
    isNextDisabled,
    onRigTypeChange,
    onDraftTypeChange,
    onRigSelect,
    previous,
    next,
    currentStep,
    steps,
    draftType,
    rigType,
    isCreatingRigDraft,
    setCurrentStep,
  };

  return (
    <CreateRigFormContext.Provider value={value}>
      {children}
    </CreateRigFormContext.Provider>
  );
};

export default CreateRigFormProvider;
