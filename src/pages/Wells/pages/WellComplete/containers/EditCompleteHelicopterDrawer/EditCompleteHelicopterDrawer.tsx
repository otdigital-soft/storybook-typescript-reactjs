import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { EditFormDrawer } from 'containers/FormDrawer';
import HelicopterForm, {
  FormValues,
} from 'pages/Wells/containers/HelicopterForm';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useEditCompleteHelicopter from 'pages/Wells/pages/WellComplete/hooks/useEditCompleteHelicopter';
import { WellCompleteAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellCompletePlan/types';

const EditCompleteHelicopterDrawer = () => {
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const { onCloseDrawer, editedRow: editedHelicopter } =
    useAddEditActions<WellCompleteAddEditActionContext>('helicopters');
  const helicopterToEdit = editedHelicopter
    ? wellPlanData?.complete_helicopter_uses.find(
        (helicopterUse) => helicopterUse.id === editedHelicopter,
      )
    : undefined;
  const {
    validationSchema,
    editCompleteHelicopterMutation: {
      mutateAsync: onEditCompleteHelicopter,
      isLoading: isEditingCompleteHelicopter,
    },
    initialValues,
  } = useEditCompleteHelicopter({
    wellPlanId,
    helicopterUse: helicopterToEdit,
    onSuccess: onCloseDrawer,
  });

  return (
    <EditFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellCompleteAddEditActionContext
    >
      title="Edit helicopter"
      onSubmit={onEditCompleteHelicopter}
      isSubmitting={isEditingCompleteHelicopter}
      initialValues={initialValues}
      validationSchema={validationSchema}
      width={600}
      context="helicopters"
    >
      <HelicopterForm />
    </EditFormDrawer>
  );
};

export default EditCompleteHelicopterDrawer;
