import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { EditFormDrawer } from 'containers/FormDrawer';
import PhaseForm, { FormValues } from 'pages/Wells/containers/PhaseForm';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useDeleteCompletePhase from './useDeleteCompletePhase';
import useEditCompletePhase from './useEditCompletePhase';
import { WellCompleteAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellCompletePlan/types';

const EditCompletePhaseDrawer = () => {
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const {
    onCloseDrawer,
    editedRow: editedPhase,
    onUnselectRow: onUnselectPhase,
  } = useAddEditActions<WellCompleteAddEditActionContext>('phases');
  const phaseToEdit = editedPhase
    ? wellPlanData?.complete_steps.find((step) => step.id === editedPhase)
    : undefined;
  const {
    validationSchema,
    editCompletePhaseMutation: {
      mutateAsync: onEditCompletePhase,
      isLoading: isEditingCompletePhase,
    },
    initialValues,
  } = useEditCompletePhase({
    wellPlanId: wellPlanData?.id,
    wellPlanStep: phaseToEdit,
    onSuccess: onCloseDrawer,
  });
  const { isDeletingCompletePhase, onDeleteCompletePhase } =
    useDeleteCompletePhase(wellPlanId);
  const onDelete = () => {
    if (!phaseToEdit || !wellPlanData) {
      return;
    }
    onDeleteCompletePhase({
      wellPlanId: wellPlanData.id,
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
      WellCompleteAddEditActionContext
    >
      title="Edit phase"
      onSubmit={onEditCompletePhase}
      isSubmitting={isEditingCompletePhase}
      validationSchema={validationSchema}
      initialValues={initialValues}
      isDeleting={isDeletingCompletePhase}
      onDelete={onDelete}
      context="phases"
      width={600}
    >
      <PhaseForm />
    </EditFormDrawer>
  );
};

export default EditCompletePhaseDrawer;
