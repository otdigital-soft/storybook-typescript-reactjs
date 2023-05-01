import { Button } from 'antd';
import { SubmitRow } from 'components/Row';
import { DraftFormSteps } from 'consts/rigs';

interface SubmitDraftFormProps {
  isPreviousAllowed: boolean;
  isNextAllowed: boolean;
  onPreviousClick: () => void;
  currentStep: DraftFormSteps;
  onSaveClick: () => void;
  onAddClick: () => void;
  isSaving: boolean;
}

const SubmitDraftForm = ({
  onPreviousClick,
  isPreviousAllowed,
  isNextAllowed,
  currentStep,
  onSaveClick,
  onAddClick,
  isSaving,
}: SubmitDraftFormProps) => {
  return (
    <SubmitRow>
      <>
        <Button disabled={!isPreviousAllowed} onClick={onPreviousClick}>
          Previous
        </Button>
        <Button
          loading={isSaving}
          disabled={!isNextAllowed}
          type={
            currentStep === DraftFormSteps.OPERATION ? 'default' : 'primary'
          }
          onClick={onSaveClick}
        >
          {currentStep === DraftFormSteps.OPERATION ? 'Save' : 'Save & next'}
        </Button>
        {currentStep === DraftFormSteps.OPERATION ? (
          <Button
            loading={isSaving}
            disabled={!isNextAllowed}
            type="primary"
            onClick={onAddClick}
          >
            Add Rig
          </Button>
        ) : null}
      </>
    </SubmitRow>
  );
};

export default SubmitDraftForm;
