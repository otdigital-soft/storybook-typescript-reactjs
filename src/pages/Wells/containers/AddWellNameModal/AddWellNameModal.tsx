import { useAddEditSelect } from 'components/AddEditSelect';
import AddEditModal from 'containers/AddEditModal';
import useAddWellName from 'pages/Wells/hooks/useAddWellName';
import WellNameForm from '../WellNameForm';

const AddWellNameModal = () => {
  const { onClose, isAdding } = useAddEditSelect();
  const {
    validationSchema,
    initialValues,
    addWellNameMutation: { mutate: addWellName },
  } = useAddWellName({
    onSuccess: onClose,
  });

  return (
    <AddEditModal
      schema={validationSchema}
      initialValues={initialValues}
      title="Add well"
      okText="Add"
      visible={isAdding}
      onCancel={onClose}
      onSubmit={(values, formikHelpers) =>
        addWellName({
          values,
          formikHelpers,
        })
      }
    >
      <WellNameForm />
    </AddEditModal>
  );
};

export default AddWellNameModal;
