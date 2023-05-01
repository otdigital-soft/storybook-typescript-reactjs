import { Spin } from 'antd';
import Button from 'components/Button';
import Box from 'components/Box';
import Center from 'components/Center';
import Result from 'components/Result';
import { SubmitRow } from 'components/Row';
import WellPlanSteps from 'pages/WellPlan/components/WellPlanSteps';
import AddEditActionsProvider from 'containers/AddEditActionsProvider';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useCompletePlannedPlan from './useCompletePlannedPlan';
import useWellPlanPlanning from './useWellPlanPlanning';
import WellPlanCO2 from './WellPlanCO2';
import WellPlanCO2ChartFiltersProvider from './WellPlanCO2ChartFiltersProvider';
import ChartYScaleProvider from 'pages/WellPlan/containers/ChartYScaleProvider';
import useCanEdit from 'pages/WellPlan/hooks/useCanEdit';
import { CurrentStepEnum } from 'api/schema';
import { WellPlanStep } from 'pages/WellPlan/consts';
import PlannedVesselList from 'pages/Wells/pages/WellPlanning/containers/PlannedVesselList';
import PlannedHelicopterList from 'pages/Wells/pages/WellPlanning/containers/PlannedHelicopterList';
import PlannedPhaseList from 'pages/Wells/pages/WellPlanning/containers/PlannedPhaseList';
import PlannedStartDate from 'pages/Wells/pages/WellPlanning/containers/PlannedStartDate';
import { Title } from 'components/Typography';

const UpdateWellPlanPlanning = () => {
  const { isLoading, error } = useWellPlanPlanning();
  const { data: wellPlanData } = useCurrentWellPlan();
  const { mutateAsync: onCompletePlan, isLoading: isCompletingPlan } =
    useCompletePlannedPlan();
  const canEdit = useCanEdit(CurrentStepEnum.WELL_PLANNING);
  const canComplete = !(
    wellPlanData?.planned_steps.length === 0 ||
    isCompletingPlan ||
    !canEdit
  );

  if (isLoading) {
    return (
      <Center mt={248}>
        <Spin size="large" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center mt={248}>
        <Result status="error" subTitle="Unable to load well plan right now" />
      </Center>
    );
  }

  return (
    <Box marginTop={44} marginBottom={106} marginX={28}>
      <AddEditActionsProvider>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          backgroundColor="white"
        >
          <WellPlanSteps
            wellPlanCurrentStep={wellPlanData?.current_step}
            wellPlanId={wellPlanData?.id}
            activeStep={WellPlanStep.Planning}
          />

          <Box marginTop={22}>
            <Title level={5}>Well planning & calculations</Title>
          </Box>

          <Box marginTop={31}>
            <PlannedStartDate />
          </Box>

          <Box marginTop={8}>
            <PlannedPhaseList />
          </Box>

          <Box marginTop={19}>
            <PlannedVesselList />
          </Box>

          <Box marginTop={9}>
            <PlannedHelicopterList />
          </Box>

          {wellPlanData?.planned_steps.length ? (
            <Box marginTop={16}>
              <ChartYScaleProvider>
                <WellPlanCO2ChartFiltersProvider>
                  <WellPlanCO2 />
                </WellPlanCO2ChartFiltersProvider>
              </ChartYScaleProvider>
            </Box>
          ) : null}
        </Box>
      </AddEditActionsProvider>
      <SubmitRow>
        <Button
          type="primary"
          disabled={!canComplete}
          fontWeight={400}
          onClick={() => onCompletePlan()}
        >
          Complete well plan
        </Button>
      </SubmitRow>
    </Box>
  );
};

export default UpdateWellPlanPlanning;
