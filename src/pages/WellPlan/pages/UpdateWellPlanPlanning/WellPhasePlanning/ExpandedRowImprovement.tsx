import Box, { Flexbox } from 'components/Box';
import { Container, Separator } from './ExpandedRowImprovement.styled';
import { WellPlannerDetailsPlannedStep } from 'api/schema';
import ExpandedRowImprovedDuration from './ExpandedRowImprovedDuration';
import ExpandedRowCO2Reduction from './ExpandedRowCO2Reduction';

interface ExpandedRowImprovementProps {
  wellPlanStep: WellPlannerDetailsPlannedStep;
}

const ExpandedRowImprovement = ({
  wellPlanStep,
}: ExpandedRowImprovementProps) => {
  return (
    <Flexbox maxWidth={388} width="100%">
      <Separator />
      <Container>
        <Box>
          <ExpandedRowImprovedDuration wellPlanStep={wellPlanStep} />
        </Box>
        <Box>
          <ExpandedRowCO2Reduction wellPlanStepId={wellPlanStep.id} />
        </Box>
      </Container>
    </Flexbox>
  );
};

export default ExpandedRowImprovement;
