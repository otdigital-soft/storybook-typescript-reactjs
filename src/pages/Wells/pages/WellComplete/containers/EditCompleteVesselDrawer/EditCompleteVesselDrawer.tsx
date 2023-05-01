import { WellPlannerDetails } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { EditFormDrawer } from 'containers/FormDrawer';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import useEditCompleteVessel from 'pages/Wells/pages/WellComplete/hooks/useEditCompleteVessel';
import { WellCompleteAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellCompletePlan/types';
import VesselForm, { FormValues } from 'pages/Wells/containers/VesselForm';

const EditCompleteVesselDrawer = () => {
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const { onCloseDrawer, editedRow: editedVessel } =
    useAddEditActions<WellCompleteAddEditActionContext>('vessels');
  const vesselUseToEdit = editedVessel
    ? wellPlanData?.complete_vessel_uses.find(
        (vesselUse) => vesselUse.id === editedVessel,
      )
    : undefined;
  const {
    validationSchema,
    editCompleteVesselMutation: {
      mutateAsync: onEditCompleteVessel,
      isLoading: isEditingCompleteVessel,
    },
    initialValues,
  } = useEditCompleteVessel({
    wellPlanId,
    vesselUse: vesselUseToEdit,
    onSuccess: onCloseDrawer,
  });

  return (
    <EditFormDrawer<
      FormValues,
      WellPlannerDetails,
      WellCompleteAddEditActionContext
    >
      title="Edit vessel"
      onSubmit={onEditCompleteVessel}
      isSubmitting={isEditingCompleteVessel}
      initialValues={initialValues}
      validationSchema={validationSchema}
      width={600}
      context="vessels"
    >
      <VesselForm />
    </EditFormDrawer>
  );
};

export default EditCompleteVesselDrawer;
