import { CheckOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Box from 'components/Box';
import Button from 'components/Button';
import Center from 'components/Center';
import Result from 'components/Result';
import { SubmitRow } from 'components/Row';
import WellPlanSteps from 'pages/WellPlan/components/WellPlanSteps';
import AddEditActionsProvider from 'containers/AddEditActionsProvider';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useCompleteCompletePlan from './useCompleteCompletePlan';
import useWellCompletePlan from './useWellCompletePlan';
import useCanEdit from 'pages/WellPlan/hooks/useCanEdit';
import { CurrentStepEnum } from 'api/schema';
import { WellPlanStep } from 'pages/WellPlan/consts';
import CompleteVesselList from 'pages/Wells/pages/WellComplete/containers/CompleteVesselList';
import CompleteHelicopterList from 'pages/Wells/pages/WellComplete/containers/CompleteHelicopterList';
import CompletePhaseList from 'pages/Wells/pages/WellComplete/containers/CompletePhaseList';

const UpdateWellCompletePlan = () => {
  const { isLoading, error } = useWellCompletePlan();
  const { data: wellPlanData } = useCurrentWellPlan();
  const { mutate: onCompletePlan, isLoading: isCompletingPlan } =
    useCompleteCompletePlan();
  const canEdit = useCanEdit(CurrentStepEnum.WELL_REVIEWING);
  const canComplete = !(
    isCompletingPlan ||
    !wellPlanData?.complete_steps.length ||
    wellPlanData?.complete_steps.some((step) => !step.approved) ||
    wellPlanData?.complete_helicopter_uses.some(
      (helicopterUse) => !helicopterUse.approved,
    ) ||
    wellPlanData?.complete_vessel_uses.some(
      (vesselUse) => !vesselUse.approved,
    ) ||
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
        <Result
          status="error"
          subTitle="Unable to load well complete plan right now"
        />
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
            activeStep={WellPlanStep.Complete}
          />

          <Box marginTop={16}>
            <CompletePhaseList />
          </Box>

          <Box marginTop={16}>
            <CompleteVesselList />
          </Box>

          <Box marginTop={16}>
            <CompleteHelicopterList />
          </Box>

          <SubmitRow>
            <Button
              type="success"
              icon={<CheckOutlined />}
              disabled={!canComplete}
              onClick={() => onCompletePlan()}
              fontWeight={400}
            >
              Complete and view analysis
            </Button>
          </SubmitRow>
        </Box>
      </AddEditActionsProvider>
    </Box>
  );
};

export default UpdateWellCompletePlan;
