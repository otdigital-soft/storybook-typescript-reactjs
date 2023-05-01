import { Alert } from 'antd';
import { CustomJackupRigDetails } from 'api/schema';
import Box from 'components/Box';
import { Formik } from 'formik';
import JackupCapacitiesStep from './JackupCapacitiesStep';
import JackupGeneralStep from './JackupGeneralStep';
import { useTheme } from 'styled-components';
import useUpdateJackupDraftForm from './useUpdateJackupDraftForm';
import JackupOperationStep from './JackupOperationStep';
import { useRef } from 'react';
import * as yup from 'yup';
import { Title } from 'components/Typography';
import { DraftFormSteps, DRAFT_STEP_TITLES } from 'consts/rigs';
import { SubmitDraftForm } from 'containers/DraftForm';
import { roundNumber } from 'utils/format';
import ProgressSteps, { Step } from 'components/ProgressSteps';

interface UpdateJackupDraftFormProps {
  jackupRigData: CustomJackupRigDetails;
}

const UpdateJackupDraftForm = ({
  jackupRigData,
}: UpdateJackupDraftFormProps) => {
  const theme = useTheme();
  const draftRef = useRef(true);
  const {
    getInitialValues,
    getValidationSchema,
    currentStep,
    steps,
    previous,
    isPreviousAllowed,
    isNextAllowed,
    onUpdateJackupRig,
    isLoading,
    setCurrentStep,
  } = useUpdateJackupDraftForm();

  const initialValues = getInitialValues(jackupRigData);

  return (
    <Box backgroundColor={theme.colors.white}>
      <Box paddingX="24px" marginBottom="20px">
        <ProgressSteps
          current={currentStep}
          percent={roundNumber((currentStep / 6) * 100, 0)}
        >
          {steps.map((item, index) => (
            <Step
              disabled={index < 3}
              key={item.title}
              {...item}
              onClick={
                index < 3
                  ? undefined
                  : () => {
                      setCurrentStep(index);
                    }
              }
            />
          ))}
        </ProgressSteps>
        <Box>
          <Title level={5} type="secondary">
            {DRAFT_STEP_TITLES[currentStep]}
          </Title>
        </Box>
      </Box>
      <Formik
        validationSchema={yup.lazy(() => getValidationSchema(draftRef.current))}
        onSubmit={(values, formikHelpers) =>
          onUpdateJackupRig({ values, formikHelpers, draft: draftRef.current })
        }
        validateOnChange={false}
        initialValues={initialValues}
      >
        {(formikProps) => (
          <Box position="relative" marginBottom="91px">
            <Box paddingX="24px">
              {formikProps.status ? (
                <Box mb="10px">
                  <Alert message={formikProps.status} type="error" showIcon />
                </Box>
              ) : null}
              {!formikProps.isValid && !draftRef.current ? (
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
              {currentStep === DraftFormSteps.GENERAL && <JackupGeneralStep />}
              {currentStep === DraftFormSteps.CAPACITIES && (
                <JackupCapacitiesStep />
              )}
              {currentStep === DraftFormSteps.OPERATION && (
                <JackupOperationStep formikProps={formikProps} />
              )}
            </Box>
            <SubmitDraftForm
              isPreviousAllowed={isPreviousAllowed}
              onPreviousClick={() => {
                draftRef.current = true;
                previous();
              }}
              currentStep={currentStep}
              isNextAllowed={isNextAllowed && formikProps.isValid}
              onSaveClick={() => {
                draftRef.current = true;
                formikProps.submitForm();
              }}
              onAddClick={() => {
                draftRef.current = false;
                formikProps.submitForm();
              }}
              isSaving={isLoading}
            />
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateJackupDraftForm;
