import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import PhaseForm, { FormValues } from 'pages/Wells/containers/PhaseForm';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useAddPlannedPhase from './useAddPlannedPhase';
import { WellPlanningAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/types';

const AddPlanPhaseDrawer = () => {
  const { onCloseDrawer } =
    useAddEditActions<WellPlanningAddEditActionContext>('phases');
  const { data: wellPlanData } = useCurrentWellPlan();
  const {
    validationSchema,
    addPlannedPhaseMutation: {
      mutateAsync: onAddPlannedPhase,
      isLoading: isAddingPlannedPhase,
    },
    initialValues,
  } = useAddPlannedPhase({
    wellPlanId: wellPlanData?.id,
    onSuccess: onCloseDrawer,
  });

  return (
    <AddFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellPlanningAddEditActionContext
    >
      title="Add phase"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onAddPlannedPhase}
      isSubmitting={isAddingPlannedPhase}
      width={600}
      context="phases"
    >
      <PhaseForm />
    </AddFormDrawer>
  );
};

export default AddPlanPhaseDrawer;
