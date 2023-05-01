import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useAddPlannedVessel from 'pages/Wells/pages/WellPlanning/hooks/useAddPlannedVessel/useAddPlannedVessel';
import { WellPlanningAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/types';
import VesselForm, { FormValues } from 'pages/Wells/containers/VesselForm';

const AddPlannedVesselDrawer = () => {
  const { onCloseDrawer } =
    useAddEditActions<WellPlanningAddEditActionContext>('vessels');
  const { wellPlanId } = useCurrentWellPlan();

  const {
    validationSchema,
    addPlannedVesselMutation: {
      mutateAsync: onAddPlannedVessel,
      isLoading: isAddingPlannedVessel,
    },
    initialValues,
  } = useAddPlannedVessel({
    wellPlanId,
    onSuccess: onCloseDrawer,
  });

  return (
    <AddFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellPlanningAddEditActionContext
    >
      title="Add vessel"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onAddPlannedVessel}
      isSubmitting={isAddingPlannedVessel}
      width={600}
      context="vessels"
    >
      <VesselForm />
    </AddFormDrawer>
  );
};

export default AddPlannedVesselDrawer;
