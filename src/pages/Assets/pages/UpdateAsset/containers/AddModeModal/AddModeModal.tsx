import { useAddEditSelect } from 'components/AddEditSelect';
import AddEditModal from 'containers/AddEditModal';
import useAddMode from 'pages/Assets/pages/UpdateAsset/hooks/useAddMode';
import ModeForm from 'pages/Assets/pages/UpdateAsset/containers/ModeForm';

const AddModeModal = () => {
  const { onClose, isAdding } = useAddEditSelect();
  const {
    validationSchema,
    initialValues,
    addModeMutation: { mutate: addMode },
  } = useAddMode({
    onSuccess: onClose,
  });

  return (
    <AddEditModal
      schema={validationSchema}
      initialValues={initialValues}
      title="Add mode"
      okText="Add"
      visible={isAdding}
      onCancel={onClose}
      onSubmit={(values, formikHelpers) =>
        addMode({
          values,
          formikHelpers,
        })
      }
    >
      <ModeForm />
    </AddEditModal>
  );
};

export default AddModeModal;
