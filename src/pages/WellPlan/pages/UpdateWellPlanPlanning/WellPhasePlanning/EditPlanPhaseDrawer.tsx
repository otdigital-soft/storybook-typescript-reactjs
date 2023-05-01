import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { EditFormDrawer } from 'containers/FormDrawer';
import PhaseForm, { FormValues } from 'pages/Wells/containers/PhaseForm';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useDeletePlannedPhase from './useDeletePlannedPhase';
import useEditPlannedPhase from './useEditPlannedPhase';
import { WellPlanningAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/types';

const EditPlanPhaseDrawer = () => {
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const {
    onCloseDrawer,
    editedRow: editedPhase,
    onUnselectRow: onUnselectPhase,
  } = useAddEditActions<WellPlanningAddEditActionContext>('phases');
  const phaseToEdit = editedPhase
    ? wellPlanData?.planned_steps.find((step) => step.id === editedPhase)
    : undefined;
  const {
    validationSchema,
    editPlannedPhaseMutation: {
      mutateAsync: onEditPlannedPhase,
      isLoading: isEditingPlannedPhase,
    },
    initialValues,
  } = useEditPlannedPhase({
    wellPlanId: wellPlanData?.id,
    wellPlanStep: phaseToEdit,
    onSuccess: onCloseDrawer,
  });
  const { onDeletePlannedPhase, isDeletingPlannedPhase } =
    useDeletePlannedPhase(wellPlanId);

  const onDelete = () => {
    if (!phaseToEdit || !wellPlanData) {
      return;
    }
    onDeletePlannedPhase({
      wellPlanPhaseId: phaseToEdit.id,
      wellPlanPhaseName: phaseToEdit.phase.name,
      onDelete: () => {
        onCloseDrawer();
        onUnselectPhase(phaseToEdit.id);
      },
    });
  };
  return (
    <EditFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellPlanningAddEditActionContext
    >
      title="Edit phase"
      onSubmit={onEditPlannedPhase}
      isSubmitting={isEditingPlannedPhase}
      initialValues={initialValues}
      validationSchema={validationSchema}
      isDeleting={isDeletingPlannedPhase}
      onDelete={onDelete}
      width={600}
      context="phases"
    >
      <PhaseForm />
    </EditFormDrawer>
  );
};

export default EditPlanPhaseDrawer;
