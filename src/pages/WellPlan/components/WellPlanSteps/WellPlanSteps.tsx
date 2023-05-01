import { WellPlanStep } from 'pages/WellPlan/consts';
import Tabs from 'components/Tabs';
import { useTheme } from 'styled-components';
import Box, { Flexbox } from 'components/Box';
import { Text } from 'components/Typography';
import { StyledProgress } from './WellPlanSteps.styled';
import { CurrentStepEnum } from 'api/schema';
import { generatePath, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import routes from 'routes';

function getPercent(step: CurrentStepEnum | undefined) {
  switch (step) {
    case CurrentStepEnum.WELL_PLANNING:
      return 50;
    case CurrentStepEnum.WELL_REVIEWING:
      return 75;
    case CurrentStepEnum.WELL_REPORTING:
      return 100;
    default:
      return 25;
  }
}

interface WellPlanStepsProps {
  activeStep: WellPlanStep;
  wellPlanCurrentStep?: CurrentStepEnum;
  wellPlanId?: number;
}

interface Step {
  title: string;
  disabled: boolean;
  key: WellPlanStep;
}

const WellPlanSteps = ({
  wellPlanId,
  wellPlanCurrentStep,
  activeStep,
}: WellPlanStepsProps) => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const steps: Step[] = useMemo(() => {
    return [
      {
        title: '01. Well details',
        disabled: false,
        key: WellPlanStep.Details,
      },
      {
        title: '02. Well planning',
        key: WellPlanStep.Planning,
        disabled: !wellPlanId || !wellPlanCurrentStep,
      },
      {
        title: '03. Well complete',
        key: WellPlanStep.Complete,
        disabled: (() => {
          if (!wellPlanId || !wellPlanCurrentStep) {
            return true;
          }
          return wellPlanCurrentStep === CurrentStepEnum.WELL_PLANNING;
        })(),
      },
      {
        title: '04. Well emission analysis',
        key: WellPlanStep.Analysis,
        disabled: (() => {
          if (!wellPlanId || !wellPlanCurrentStep) {
            return true;
          }
          return (
            wellPlanCurrentStep === CurrentStepEnum.WELL_PLANNING ||
            wellPlanCurrentStep === CurrentStepEnum.WELL_REVIEWING
          );
        })(),
      },
    ];
  }, [wellPlanCurrentStep, wellPlanId]);

  return (
    <Tabs
      activeKey={activeStep}
      type="card"
      size="large"
      tabBarExtraContent={
        <Flexbox alignItems="center">
          <StyledProgress
            percent={getPercent(wellPlanCurrentStep)}
            steps={4}
            strokeColor={colors.turquoise['1']}
            showInfo={false}
          />
          <Box marginLeft={6}>
            <Text fontSize={12} lineHeight="20px">
              {getPercent(wellPlanCurrentStep)}%
            </Text>
          </Box>
        </Flexbox>
      }
      onChange={(activeKey) => {
        const activatedStep = steps.find(
          (step) => step.key === (activeKey as WellPlanStep),
        );
        if (activatedStep) {
          navigate(
            generatePath(routes.updateWellPlanStep, {
              wellPlanId: String(wellPlanId),
              stepId: activatedStep.key,
            }),
          );
        }
      }}
    >
      {steps.map((item) => (
        <Tabs.TabPane
          tab={item.title}
          key={item.key}
          disabled={item.disabled}
        />
      ))}
    </Tabs>
  );
};

export default WellPlanSteps;
