import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import PhaseForm, { FormValues } from 'pages/Wells/containers/PhaseForm';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useAddCompletePhase from './useAddCompletePhase';
import { WellCompleteAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellCompletePlan/types';

const AddCompletePhaseDrawer = () => {
  const { onCloseDrawer } =
    useAddEditActions<WellCompleteAddEditActionContext>('phases');
  const { data: wellPlanData } = useCurrentWellPlan();
  const {
    validationSchema,
    addCompletePhaseMutation: {
      mutateAsync: onAddCompletePhase,
      isLoading: isAddingCompletePhase,
    },
    initialValues,
  } = useAddCompletePhase({
    wellPlanId: wellPlanData?.id,
    onSuccess: onCloseDrawer,
  });

  return (
    <AddFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellCompleteAddEditActionContext
    >
      title="Add phase"
      onSubmit={onAddCompletePhase}
      isSubmitting={isAddingCompletePhase}
      validationSchema={validationSchema}
      initialValues={initialValues}
      width={600}
      context="phases"
    >
      <PhaseForm />
    </AddFormDrawer>
  );
};

export default AddCompletePhaseDrawer;
