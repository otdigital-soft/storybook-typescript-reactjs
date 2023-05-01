import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import HelicopterForm, {
  FormValues,
} from 'pages/Wells/containers/HelicopterForm';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useAddPlannedHelicopter from 'pages/Wells/pages/WellPlanning/hooks/useAddPlannedHelicopter';
import { WellPlanningAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/types';

const AddPlannedHelicopterDrawer = () => {
  const { onCloseDrawer } =
    useAddEditActions<WellPlanningAddEditActionContext>('helicopters');
  const { wellPlanId } = useCurrentWellPlan();
  const {
    validationSchema,
    addPlannedHelicopterMutation: {
      mutateAsync: onAddPlannedHelicopter,
      isLoading: isAddingPlannedHelicopter,
    },
    initialValues,
  } = useAddPlannedHelicopter({
    wellPlanId,
    onSuccess: onCloseDrawer,
  });

  return (
    <AddFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellPlanningAddEditActionContext
    >
      title="Add helicopter"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onAddPlannedHelicopter}
      isSubmitting={isAddingPlannedHelicopter}
      width={600}
      context="helicopters"
    >
      <HelicopterForm />
    </AddFormDrawer>
  );
};

export default AddPlannedHelicopterDrawer;
