import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import { Title } from 'components/Typography';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import AddCompletePhaseDrawer from 'pages/WellPlan/pages/UpdateWellCompletePlan/WellCompletePhasePlanning/AddCompletePhaseDrawer';
import EditCompletePhaseDrawer from 'pages/WellPlan/pages/UpdateWellCompletePlan/WellCompletePhasePlanning/EditCompletePhaseDrawer';
import useApproveCompletePhases from 'pages/WellPlan/pages/UpdateWellCompletePlan/WellCompletePhasePlanning/useApproveCompletePhases';
import { WellCompleteAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellCompletePlan/types';
import useCanEdit from 'pages/WellPlan/hooks/useCanEdit';
import { CurrentStepEnum, WellPlannerDetailsCompleteStep } from 'api/schema';
import { StyledTable } from 'components/Table';
import { DragDropContext } from 'react-beautiful-dnd';
import useMoveCompleteStep from 'pages/WellPlan/pages/UpdateWellCompletePlan/WellCompletePhasePlanning/useMoveCompleteStep';
import useDeleteCompletePhase from 'pages/WellPlan/pages/UpdateWellCompletePlan/WellCompletePhasePlanning/useDeleteCompletePhase';
import useDuplicateCompletePhase from 'pages/WellPlan/pages/UpdateWellCompletePlan/WellCompletePhasePlanning/useDuplicateCompletePhase';
import usePhaseListColumns from 'pages/Wells/hooks/usePhaseListColumns';
import usePhaseListTableProps from 'pages/Wells/hooks/usePhaseListTableProps';
import { WellPlanningAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/types';

const CompletePhaseList = () => {
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const steps = wellPlanData?.complete_steps || [];
  const {
    onAddRow: onAddPhase,
    selectedRows: selectedPhases,
    setSelectedRows: setSelectedPhases,
    onUnselectRow: onUnselectPhase,
    onCloseDrawer,
  } = useAddEditActions<WellCompleteAddEditActionContext>('phases');
  const { isApprovingPhases, onApprovePhases } =
    useApproveCompletePhases(wellPlanId);
  const canEdit = useCanEdit(CurrentStepEnum.WELL_REVIEWING);
  const canApprove = !(!selectedPhases.length || isApprovingPhases || !canEdit);
  const onMoveCompletePhase = useMoveCompleteStep(wellPlanId);
  const { onDeleteCompletePhase } = useDeleteCompletePhase(wellPlanId);
  const { onDuplicateCompletePhase } = useDuplicateCompletePhase(wellPlanId);
  const onDeletePhase = (phase: WellPlannerDetailsCompleteStep) => {
    if (!wellPlanData) {
      return;
    }

    onDeleteCompletePhase({
      wellPlanId: wellPlanData.id,
      wellPlanPhaseId: phase.id,
      wellPlanPhaseName: phase.phase.name,
      onDelete: () => {
        onCloseDrawer();
        onUnselectPhase(phase.id);
      },
    });
  };
  const phaseListColumns = usePhaseListColumns<WellPlannerDetailsCompleteStep>({
    selectionColumn: true,
    expandColumn: false,
  });
  const phaseListTableProps = usePhaseListTableProps<
    WellPlannerDetailsCompleteStep,
    WellPlanningAddEditActionContext
  >({
    selectedRowKeys: selectedPhases,
    context: 'phases',
    columns: phaseListColumns,
    expandable: false,
    editable: canEdit,
    onDeletePhase,
    rowSelection: true,
    onDuplicatePhase: onDuplicateCompletePhase,
    extraActions: [
      {
        key: 'approve',
        menuItemProps: (phase) => ({
          children: 'Approve',
          disabled: phase.approved || !canEdit,
          onClick: () =>
            onApprovePhases({
              phases: [phase.id],
            }),
        }),
      },
    ],
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
              disabled={!canEdit}
              onClick={onAddPhase}
              fontWeight={400}
            >
              Add phase
            </Button>
          </Box>
          <Box width={168}>
            <Button
              type="success"
              icon={<CheckOutlined />}
              disabled={!canApprove}
              block
              onClick={() => {
                if (selectedPhases) {
                  onApprovePhases({
                    phases: selectedPhases,
                    onSuccess: () => {
                      setSelectedPhases([]);
                    },
                  });
                }
              }}
              fontWeight={400}
            >
              Approve
            </Button>
          </Box>
        </Flexbox>
      </Flexbox>
      <Box marginTop={11}>
        <DragDropContext onDragEnd={onMoveCompletePhase}>
          <StyledTable dataSource={steps} {...phaseListTableProps} />
        </DragDropContext>
      </Box>
      <AddCompletePhaseDrawer />
      <EditCompletePhaseDrawer />
    </>
  );
};

export default CompletePhaseList;
