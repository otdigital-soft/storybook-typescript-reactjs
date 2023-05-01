import { Spin } from 'antd';
import Box from 'components/Box';
import Center from 'components/Center';
import Result from 'components/Result';
import { Formik } from 'formik';
import useCompleteAssets from 'hooks/useCompleteAssets';
import WellDetailsForm from 'pages/Wells/containers/WellDetailsForm';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useUpdateWellDetails from './hooks/useUpdateWellDetails';
import { SubmitRow } from 'components/Row';
import { CurrentStepEnum } from 'api/schema';
import useCanEdit from 'pages/WellPlan/hooks/useCanEdit';
import WellPlanSteps from 'pages/WellPlan/components/WellPlanSteps';
import { WellPlanStep } from 'pages/WellPlan/consts';
import Button from 'components/Button';

const WellDetails = () => {
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const { error: assetsError, isLoading: isLoadingAssets } =
    useCompleteAssets();
  const { initialValues, onSubmit, validationSchema } = useUpdateWellDetails(
    wellPlanId,
    wellPlanData,
  );
  const canEdit = useCanEdit(CurrentStepEnum.WELL_PLANNING);
  const disabledFields = canEdit
    ? {
        asset: !!wellPlanData?.planned_steps.length,
      }
    : {
        name: true,
        sidetrack: true,
        description: true,
        field: true,
        location: true,
        type: true,
        asset: true,
        fuel_type: true,
        fuel_density: true,
        co2_per_fuel: true,
        nox_per_fuel: true,
        co2_tax: true,
        nox_tax: true,
        fuel_cost: true,
        boilers_co2_per_fuel: true,
        boilers_nox_per_fuel: true,
      };

  if (isLoadingAssets) {
    return (
      <Center flexGrow={1}>
        <Spin size="large" />
      </Center>
    );
  }

  if (assetsError) {
    return (
      <Center flexGrow={1}>
        <Result status="error" subTitle="Unable to load well right now" />
      </Center>
    );
  }

  return (
    <Box marginTop={44} marginBottom={106} marginX={28}>
      <Formik
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) =>
          onSubmit({
            values,
            formikHelpers,
          })
        }
        initialValues={initialValues}
      >
        {({ submitForm, isValid, isSubmitting }) => {
          return (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              backgroundColor="white"
            >
              <WellPlanSteps
                wellPlanCurrentStep={wellPlanData?.current_step}
                wellPlanId={wellPlanId}
                activeStep={WellPlanStep.Details}
              />

              <Box marginTop={30}>
                <WellDetailsForm disabledFields={disabledFields} />
              </Box>

              <SubmitRow>
                <Button
                  onClick={submitForm}
                  type="primary"
                  fontWeight={400}
                  disabled={!isValid || isSubmitting || !canEdit}
                >
                  Save and continue
                </Button>
              </SubmitRow>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};

export default WellDetails;
