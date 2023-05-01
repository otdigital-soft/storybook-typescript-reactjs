import { Button } from 'antd';
import Box from 'components/Box';
import { SubmitRow } from 'components/Row';
import SelectDraftTypeStep from './SelectDraftTypeStep';
import SelectRigStep from './SelectRigStep';
import SelectRigTypeStep from './SelectRigTypeStep';
import useCreateRigForm, { CreateRigFormSteps } from './useCreateRigForm';
import ProgressSteps, { Step } from 'components/ProgressSteps';
import { roundNumber } from 'utils/format';

const CreateRigForm = () => {
  const {
    draftType,
    rigType,
    currentStep,
    next,
    previous,
    steps,
    isNextDisabled,
    setCurrentStep,
  } = useCreateRigForm();

  const isStepEnabled = (index: number) => {
    if (index === currentStep) return false;

    return (
      index === 0 || (index === 1 && rigType) || (index === 2 && draftType)
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      backgroundColor="white"
    >
      <Box paddingX={24}>
        <ProgressSteps
          current={currentStep}
          percent={roundNumber((currentStep / 6) * 100, 0)}
        >
          {steps.map((item, index) => (
            <Step
              disabled={!isStepEnabled(index)}
              key={item.title}
              {...item}
              onClick={
                isStepEnabled(index)
                  ? () => {
                      setCurrentStep(index);
                    }
                  : undefined
              }
            />
          ))}
        </ProgressSteps>

        <Box marginTop={8}>
          {currentStep === CreateRigFormSteps.RigType ? (
            <SelectRigTypeStep />
          ) : null}
          {currentStep === CreateRigFormSteps.DraftType && rigType ? (
            <SelectDraftTypeStep />
          ) : null}
          {currentStep === CreateRigFormSteps.SelectRig &&
          rigType &&
          draftType ? (
            <SelectRigStep />
          ) : null}
        </Box>
      </Box>
      <SubmitRow>
        <>
          <Button
            onClick={() => previous()}
            disabled={currentStep === CreateRigFormSteps.RigType}
          >
            Previous
          </Button>
          <Button
            type="primary"
            disabled={isNextDisabled}
            onClick={() => next()}
          >
            Next
          </Button>
        </>
      </SubmitRow>
    </Box>
  );
};

export default CreateRigForm;
