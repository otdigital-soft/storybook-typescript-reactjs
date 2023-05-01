import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import HelicopterForm, {
  FormValues,
} from 'pages/Wells/containers/HelicopterForm';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useAddCompleteHelicopterUse from 'pages/Wells/pages/WellComplete/hooks/useAddCompleteHelicopter';
import { WellCompleteAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellCompletePlan/types';

const AddCompleteHelicopterDrawer = () => {
  const { onCloseDrawer } =
    useAddEditActions<WellCompleteAddEditActionContext>('helicopters');
  const { wellPlanId } = useCurrentWellPlan();
  const {
    validationSchema,
    addCompleteHelicopterMutation: {
      mutateAsync: onAddCompleteHelicopter,
      isLoading: isAddingCompleteHelicopter,
    },
    initialValues,
  } = useAddCompleteHelicopterUse({
    wellPlanId,
    onSuccess: onCloseDrawer,
  });

  return (
    <AddFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellCompleteAddEditActionContext
    >
      title="Add helicopter"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onAddCompleteHelicopter}
      isSubmitting={isAddingCompleteHelicopter}
      width={600}
      context="helicopters"
    >
      <HelicopterForm />
    </AddFormDrawer>
  );
};

export default AddCompleteHelicopterDrawer;
