import { Alert } from 'antd';
import { CustomSemiRigDetails } from 'api/schema';
import Box from 'components/Box';
import { Formik } from 'formik';
import SemiCapacitiesStep from './SemiCapacitiesStep';
import SemiGeneralStep from './SemiGeneralStep';
import { useTheme } from 'styled-components';
import useUpdateSemiDraftForm from './useUpdateSemiDraftForm';
import SemiOperationStep from './SemiOperationStep';
import { useRef } from 'react';
import * as yup from 'yup';
import { Title } from 'components/Typography';
import { DRAFT_STEP_TITLES, DraftFormSteps } from 'consts/rigs';
import { SubmitDraftForm } from 'containers/DraftForm';
import { roundNumber } from 'utils/format';
import ProgressSteps, { Step } from 'components/ProgressSteps';

interface UpdateSemiDraftFormProps {
  semiRigData: CustomSemiRigDetails;
}

const UpdateSemiDraftForm = ({ semiRigData }: UpdateSemiDraftFormProps) => {
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
    onUpdateSemiRig,
    isLoading,
    setCurrentStep,
  } = useUpdateSemiDraftForm();

  const initialValues = getInitialValues(semiRigData);

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
          <Title level={5}>{DRAFT_STEP_TITLES[currentStep]}</Title>
        </Box>
      </Box>
      <Formik
        validationSchema={yup.lazy(() => getValidationSchema(draftRef.current))}
        onSubmit={(values, formikHelpers) =>
          onUpdateSemiRig({ values, formikHelpers, draft: draftRef.current })
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
              {currentStep === DraftFormSteps.GENERAL && <SemiGeneralStep />}
              {currentStep === DraftFormSteps.CAPACITIES && (
                <SemiCapacitiesStep />
              )}
              {currentStep === DraftFormSteps.OPERATION && (
                <SemiOperationStep formikProps={formikProps} />
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

export default UpdateSemiDraftForm;
