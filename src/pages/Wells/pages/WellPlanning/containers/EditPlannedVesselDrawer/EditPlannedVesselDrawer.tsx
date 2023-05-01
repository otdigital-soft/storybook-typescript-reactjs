import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { EditFormDrawer } from 'containers/FormDrawer';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useEditPlannedVessel from 'pages/Wells/pages/WellPlanning/hooks/useEditPlannedVessel/useEditPlannedVessel';
import { WellPlanningAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellPlanPlanning/types';
import VesselForm, { FormValues } from 'pages/Wells/containers/VesselForm';

const EditPlannedVesselDrawer = () => {
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const { onCloseDrawer, editedRow: editedVessel } =
    useAddEditActions<WellPlanningAddEditActionContext>('vessels');
  const vesselUseToEdit = editedVessel
    ? wellPlanData?.planned_vessel_uses.find(
        (vesselUse) => vesselUse.id === editedVessel,
      )
    : undefined;
  const {
    validationSchema,
    editPlannedVesselUseMutation: {
      mutateAsync: onEditPlannedVesselUse,
      isLoading: isEditingPlannedVesselUse,
    },
    initialValues,
  } = useEditPlannedVessel({
    wellPlanId,
    vesselUse: vesselUseToEdit,
    onSuccess: onCloseDrawer,
  });

  return (
    <EditFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellPlanningAddEditActionContext
    >
      title="Edit vessel"
      onSubmit={onEditPlannedVesselUse}
      isSubmitting={isEditingPlannedVesselUse}
      initialValues={initialValues}
      validationSchema={validationSchema}
      width={600}
      context="vessels"
    >
      <VesselForm />
    </EditFormDrawer>
  );
};

export default EditPlannedVesselDrawer;
