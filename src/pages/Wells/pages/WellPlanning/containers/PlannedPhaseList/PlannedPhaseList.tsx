import { PlusOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import { Title } from 'components/Typography';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import AddPlanPhaseDrawer from 'pages/WellPlan/pages/UpdateWellPlanPlanning/WellPhasePlanning/AddPlanPhaseDrawer';
import EditPlanPhaseDrawer from 'pages/WellPlan/pages/UpdateWellPlanPlanning/WellPhasePlanning/EditPlanPhaseDrawer';
import { WellPlanningAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/types';
import useCanEdit from 'pages/WellPlan/hooks/useCanEdit';
import { CurrentStepEnum, WellPlannerDetailsPlannedStep } from 'api/schema';
import { StyledTable } from 'components/Table';
import { DragDropContext } from 'react-beautiful-dnd';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useDeletePlannedPhase from 'pages/WellPlan/pages/UpdateWellPlanPlanning/WellPhasePlanning/useDeletePlannedPhase';
import useDuplicatePlannedPhase from 'pages/WellPlan/pages/UpdateWellPlanPlanning/WellPhasePlanning/useDuplicatePlannedPhase';
import useMovePlannedPhase from 'pages/WellPlan/pages/UpdateWellPlanPlanning/WellPhasePlanning/useMovePlannedPhase';
import useUpdatePlannedPhaseEmissionReductionInitiatives from 'pages/WellPlan/pages/UpdateWellPlanPlanning/WellPhasePlanning/useUpdatePlannedPhaseEmissionReductionInitiatives';
import usePhaseListColumns from 'pages/Wells/hooks/usePhaseListColumns';
import usePhaseListTableProps from 'pages/Wells/hooks/usePhaseListTableProps';
import ExpandedRowEmissionReductionInitiatives from 'pages/WellPlan/containers/ExpandedRowEmissionReductionInitiatives';
import ExpandedRowImprovement from 'pages/WellPlan/pages/UpdateWellPlanPlanning/WellPhasePlanning/ExpandedRowImprovement';

const PlannedPhaseList = () => {
  const {
    onAddRow: onAddPhase,
    onUnselectRow: onUnselectPhase,
    selectedRows: selectedPhases,
  } = useAddEditActions<WellPlanningAddEditActionContext>('phases');
  const canEdit = useCanEdit(CurrentStepEnum.WELL_PLANNING);
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const steps = wellPlanData?.planned_steps || [];
  const { onDeletePlannedPhase } = useDeletePlannedPhase(wellPlanId);
  const { onDuplicatePlannedPhase } = useDuplicatePlannedPhase(wellPlanId);
  const onMovePlannedPhase = useMovePlannedPhase(wellPlanId);
  const { mutate: updateEmissionReductionInitiatives } =
    useUpdatePlannedPhaseEmissionReductionInitiatives();
  const onUpdateEmissionReductionInitiatives = (
    wellPlanPhaseId: number,
    emissionReductionInitiativesIds: number[],
  ) =>
    updateEmissionReductionInitiatives({
      wellPlanPhaseId,
      emissionReductionInitiativesIds,
    });
  const onDeletePhase = (phase: WellPlannerDetailsPlannedStep) => {
    if (!wellPlanData) {
      return;
    }

    onDeletePlannedPhase({
      wellPlanPhaseId: phase.id,
      wellPlanPhaseName: phase.phase.name,
      onDelete: () => {
        onUnselectPhase(phase.id);
      },
    });
  };
  const phaseListColumns = usePhaseListColumns<WellPlannerDetailsPlannedStep>({
    selectionColumn: false,
    expandColumn: true,
  });
  const phaseListTableProps = usePhaseListTableProps<
    WellPlannerDetailsPlannedStep,
    WellPlanningAddEditActionContext
  >({
    selectedRowKeys: selectedPhases,
    context: 'phases',
    columns: phaseListColumns,
    editable: canEdit,
    expandable: true,
    onDeletePhase,
    rowSelection: false,
    onDuplicatePhase: onDuplicatePlannedPhase,
    expandedRowRender: (step) => (
      <Flexbox justifyContent="space-between">
        <ExpandedRowEmissionReductionInitiatives
          wellPlanStep={step}
          editable={canEdit}
          onUpdateEmissionReductionInitiatives={
            onUpdateEmissionReductionInitiatives
          }
        />
        <ExpandedRowImprovement wellPlanStep={step} />
      </Flexbox>
    ),
  });

  return (
    <>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Title level={4}>Phases</Title>
        <Flexbox gap={8}>
          <Box width={168}>
            <Button
              type="success"
              icon={<PlusOutlined />}
              block
              onClick={onAddPhase}
              disabled={!canEdit}
              fontWeight={400}
            >
              Add phase
            </Button>
          </Box>
        </Flexbox>
      </Flexbox>
      <Box marginTop={11}>
        <DragDropContext onDragEnd={onMovePlannedPhase}>
          <StyledTable<WellPlannerDetailsPlannedStep>
            {...phaseListTableProps}
            dataSource={steps}
          />
        </DragDropContext>
      </Box>
      <AddPlanPhaseDrawer />
      <EditPlanPhaseDrawer />
    </>
  );
};

export default PlannedPhaseList;
