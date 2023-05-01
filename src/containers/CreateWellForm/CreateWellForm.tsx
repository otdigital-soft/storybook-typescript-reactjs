import Box from 'components/Box';
import { Button } from 'antd';
import { SubmitRow } from 'components/Row';
import useCreateWellForm from 'containers/CreateWellForm/useCreateWellForm';
import { WellFormStep } from 'containers/CreateWellForm/consts';
import SelectWellStep from 'containers/CreateWellForm/SelectWellStep';
import SelectDraftStep from 'containers/CreateWellForm/SelectDraftStep';
import ProgressSteps, { Step } from 'components/ProgressSteps';
import { roundNumber } from 'utils/format';

const CreateWellForm = () => {
  const { next, canNext, previous, canPrevious, currentStep, steps } =
    useCreateWellForm();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      backgroundColor="white"
    >
      <ProgressSteps
        current={currentStep}
        percent={roundNumber((currentStep / 5) * 100, 0)}
      >
        {steps.map((item, index) => (
          <Step
            disabled={index > 1}
            key={item.title}
            {...item}
            onClick={
              index > 1
                ? undefined
                : () => {
                    canPrevious ? previous() : null;
                  }
            }
          />
        ))}
      </ProgressSteps>
      <Box marginTop={8}>
        {currentStep === WellFormStep.SelectDraft ? <SelectDraftStep /> : null}
        {currentStep === WellFormStep.SelectWell ? <SelectWellStep /> : null}
      </Box>
      <SubmitRow>
        <>
          <Button onClick={() => previous()} disabled={!canPrevious}>
            Previous
          </Button>
          <Button type="primary" disabled={!canNext} onClick={next}>
            Next
          </Button>
        </>
      </SubmitRow>
    </Box>
  );
};

export default CreateWellForm;
