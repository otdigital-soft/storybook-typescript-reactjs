import { useAddEditSelect } from 'components/AddEditSelect';
import AddEditModal from 'containers/AddEditModal';
import useAddPhase from 'pages/Assets/pages/UpdateAsset/hooks/useAddPhase';
import PhaseForm from 'pages/Assets/pages/UpdateAsset/containers/PhaseForm';

const AddPhaseModal = () => {
  const { onClose, isAdding } = useAddEditSelect();
  const {
    validationSchema,
    initialValues,
    addPhaseMutation: { mutate: addPhase },
  } = useAddPhase({
    onSuccess: onClose,
  });

  return (
    <AddEditModal
      schema={validationSchema}
      initialValues={initialValues}
      title="Add phase"
      okText="Add"
      visible={isAdding}
      onCancel={onClose}
      onSubmit={(values, formikHelpers) =>
        addPhase({
          values,
          formikHelpers,
        })
      }
    >
      <PhaseForm />
    </AddEditModal>
  );
};

export default AddPhaseModal;
