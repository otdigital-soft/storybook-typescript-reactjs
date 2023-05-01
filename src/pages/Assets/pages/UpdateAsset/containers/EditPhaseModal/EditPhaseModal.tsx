import { useAddEditSelect } from 'components/AddEditSelect';
import useUpdatePhase from 'pages/Assets/pages/UpdateAsset/hooks/useUpdatePhase';
import usePhases from 'pages/Assets/pages/UpdateAsset/hooks/usePhases';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import AddEditModal from 'containers/AddEditModal';
import PhaseForm from 'pages/Assets/pages/UpdateAsset/containers/PhaseForm';

const EditPhaseModal = () => {
  const assetId = useAssetId();
  const { onClose, editedOption } = useAddEditSelect();
  const { data: phasesData } = usePhases(assetId);
  const editedPhase = phasesData?.find((phase) => phase.id === editedOption);
  const {
    validationSchema,
    initialValues,
    updatePhaseMutation: { mutate: updatePhase },
  } = useUpdatePhase({
    onSuccess: onClose,
    phase: editedPhase,
  });

  return (
    <AddEditModal
      schema={validationSchema}
      initialValues={initialValues}
      title="Edit phase"
      okText="Update"
      visible={!!editedPhase}
      onCancel={onClose}
      onSubmit={(values, formikHelpers) =>
        updatePhase({
          values,
          formikHelpers,
        })
      }
    >
      <PhaseForm />
    </AddEditModal>
  );
};

export default EditPhaseModal;
