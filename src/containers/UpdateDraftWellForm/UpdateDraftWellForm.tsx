import { CustomWellDetails } from 'api/schema';
import { Alert, Button } from 'antd';
import Box from 'components/Box';
import { Formik } from 'formik';
import { useRef } from 'react';
import useUpdateDraftWellForm from './useUpdateDraftWellForm';
import { WellFormStep } from 'containers/CreateWellForm/consts';
import { SubmitRow } from 'components/Row';
import * as yup from 'yup';
import GeneralInformationStep from './GeneralInformationStep';
import DrillingSettingsStep from 'containers/UpdateDraftWellForm/DrillingSettingsStep';
import AdditionalDataStep from 'containers/UpdateDraftWellForm/AdditionalDataStep';
import { roundNumber } from 'utils/format';
import ProgressSteps, { Step } from 'components/ProgressSteps';

interface UpdateDraftWellFormProps {
  wellData: CustomWellDetails;
  onSuccessSave: () => void;
  onSuccessAdd: () => void;
}

export enum SubmitType {
  Save = 'save',
  Add = 'add',
}

const UpdateDraftWellForm = ({
  wellData,
  onSuccessSave,
  onSuccessAdd,
}: UpdateDraftWellFormProps) => {
  const submitTypeRef = useRef<SubmitType>();
  const {
    currentStep,
    steps,
    initialValues,
    getValidationSchema,
    onAddWell,
    onSaveWell,
    canPrevious,
    previous,
    canNext,
    isLast,
    isAdding,
    isSaving,
    setCurrentStep,
  } = useUpdateDraftWellForm({
    well: wellData,
    onSuccessSave,
    onSuccessAdd,
  });

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
            disabled={index < 2}
            key={item.title}
            {...item}
            onClick={index < 2 ? undefined : () => setCurrentStep(index)}
          />
        ))}
      </ProgressSteps>
      <Box marginTop={8}>
        <Formik
          validationSchema={yup.lazy(() => {
            return getValidationSchema(submitTypeRef.current);
          })}
          onSubmit={(values, formikHelpers) => {
            if (submitTypeRef.current === SubmitType.Add) {
              onAddWell({ values, formikHelpers });
            } else if (submitTypeRef.current === SubmitType.Save) {
              onSaveWell({ values, formikHelpers });
            } else {
              throw new Error(
                `${submitTypeRef.current} is unknown submit action`,
              );
            }
          }}
          validateOnChange={false}
          initialValues={initialValues}
        >
          {(formikProps) => {
            const { status, isValid, submitForm } = formikProps;
            return (
              <Box>
                <Box>
                  {status ? (
                    <Box mb="10px">
                      <Alert message={status} type="error" showIcon />
                    </Box>
                  ) : null}
                  {!isValid && submitTypeRef.current === SubmitType.Add ? (
                    <Box mb="10px">
                      <Alert
                        message={
                          'Unable to add, some data is missing, please review all steps and provide all information'
                        }
                        type="error"
                        showIcon
                      />
                    </Box>
                  ) : null}
                  {currentStep === WellFormStep.EnterGeneralInformation ? (
                    <GeneralInformationStep />
                  ) : null}
                  {currentStep === WellFormStep.EnterDrillingSettings ? (
                    <DrillingSettingsStep />
                  ) : null}
                  {currentStep === WellFormStep.EnterAdditionalData ? (
                    <AdditionalDataStep />
                  ) : null}
                </Box>
                <SubmitRow>
                  <>
                    <Button
                      disabled={!canPrevious}
                      onClick={() => {
                        previous();
                      }}
                    >
                      Previous
                    </Button>
                    {isLast ? (
                      <>
                        <Button
                          loading={isSaving}
                          disabled={!isValid}
                          onClick={async () => {
                            try {
                              submitTypeRef.current = SubmitType.Save;
                              await submitForm();
                            } finally {
                              submitTypeRef.current = undefined;
                            }
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          loading={isAdding}
                          disabled={!isValid}
                          type="primary"
                          onClick={async () => {
                            try {
                              submitTypeRef.current = SubmitType.Add;
                              await submitForm();
                            } finally {
                              submitTypeRef.current = undefined;
                            }
                          }}
                        >
                          Add well
                        </Button>
                      </>
                    ) : (
                      <Button
                        loading={isSaving}
                        disabled={!canNext || !isValid}
                        type="primary"
                        onClick={async () => {
                          try {
                            submitTypeRef.current = SubmitType.Save;
                            await submitForm();
                          } finally {
                            submitTypeRef.current = undefined;
                          }
                        }}
                      >
                        Save and next
                      </Button>
                    )}
                  </>
                </SubmitRow>
              </Box>
            );
          }}
        </Formik>
      </Box>
    </Box>
  );
};

export default UpdateDraftWellForm;
