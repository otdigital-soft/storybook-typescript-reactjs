import { useCallback, useEffect, useState } from 'react';
import { DraftFormSteps } from 'consts/rigs';

const useUpdateDraftForm = () => {
  const [currentStep, setCurrentStep] = useState(DraftFormSteps.GENERAL);
  const [isPreviousAllowed, setIsPreviousAllowed] = useState(false);
  const [isNextAllowed, setIsNextAllowed] = useState(false);

  const next = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [currentStep]);

  const previous = useCallback(() => {
    const previousStep = currentStep - 1;

    setCurrentStep(
      previousStep < DraftFormSteps.GENERAL
        ? DraftFormSteps.GENERAL
        : previousStep,
    );
  }, [currentStep]);

  useEffect(() => {
    setIsPreviousAllowed(currentStep - 1 >= DraftFormSteps.GENERAL);
    setIsNextAllowed(currentStep <= DraftFormSteps.OPERATION);
  }, [currentStep]);

  return {
    currentStep,
    isNextAllowed,
    isPreviousAllowed,
    next,
    previous,
    setCurrentStep,
  };
};

export default useUpdateDraftForm;
