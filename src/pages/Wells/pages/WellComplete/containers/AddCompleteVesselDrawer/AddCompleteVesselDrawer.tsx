import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useAddCompleteVessel from 'pages/Wells/pages/WellComplete/hooks/useAddCompleteVessel';
import { WellCompleteAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellCompletePlan/types';
import VesselForm, { FormValues } from 'pages/Wells/containers/VesselForm';

const AddCompleteVesselDrawer = () => {
  const { onCloseDrawer } =
    useAddEditActions<WellCompleteAddEditActionContext>('vessels');
  const { wellPlanId } = useCurrentWellPlan();

  const {
    validationSchema,
    addCompleteVesselMutation: {
      mutateAsync: onAddCompleteVessel,
      isLoading: isAddingCompleteVessel,
    },
    initialValues,
  } = useAddCompleteVessel({
    wellPlanId,
    onSuccess: onCloseDrawer,
  });

  return (
    <AddFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellCompleteAddEditActionContext
    >
      title="Add vessel"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onAddCompleteVessel}
      isSubmitting={isAddingCompleteVessel}
      width={600}
      context="vessels"
    >
      <VesselForm />
    </AddFormDrawer>
  );
};

export default AddCompleteVesselDrawer;
