import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { EditFormDrawer } from 'containers/FormDrawer';
import HelicopterForm, {
  FormValues,
} from 'pages/Wells/containers/HelicopterForm';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useEditPlannedHelicopter from 'pages/Wells/pages/WellPlanning/hooks/useEditPlannedHelicopter';
import { WellPlanningAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/types';

const EditPlannedHelicopterDrawer = () => {
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const { onCloseDrawer, editedRow: editedHelicopter } =
    useAddEditActions<WellPlanningAddEditActionContext>('helicopters');
  const helicopterUseToEdit = editedHelicopter
    ? wellPlanData?.planned_helicopter_uses.find(
        (helicopterUse) => helicopterUse.id === editedHelicopter,
      )
    : undefined;
  const {
    validationSchema,
    editPlannedHelicopterMutation: {
      mutateAsync: onEditPlannedHelicopterUse,
      isLoading: isEditingPlannedHelicopterUse,
    },
    initialValues,
  } = useEditPlannedHelicopter({
    wellPlanId,
    helicopterUse: helicopterUseToEdit,
    onSuccess: onCloseDrawer,
  });

  return (
    <EditFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellPlanningAddEditActionContext
    >
      title="Edit helicopter"
      onSubmit={onEditPlannedHelicopterUse}
      isSubmitting={isEditingPlannedHelicopterUse}
      initialValues={initialValues}
      validationSchema={validationSchema}
      width={600}
      context="helicopters"
    >
      <HelicopterForm />
    </EditFormDrawer>
  );
};

export default EditPlannedHelicopterDrawer;
