import { useAddEditSelect } from 'components/AddEditSelect';
import useUpdateMode from 'pages/Assets/pages/UpdateAsset/hooks/useUpdateMode';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import AddEditModal from 'containers/AddEditModal';
import ModeForm from 'pages/Assets/pages/UpdateAsset/containers/ModeForm';
import useModes from 'pages/Assets/pages/UpdateAsset/hooks/useModes';

const EditModeModal = () => {
  const assetId = useAssetId();
  const { onClose, editedOption } = useAddEditSelect();
  const { data: modesData } = useModes(assetId);
  const editedMode = modesData?.find((mode) => mode.id === editedOption);
  const {
    validationSchema,
    initialValues,
    updateModeMutation: { mutate: updateMode },
  } = useUpdateMode({
    onSuccess: onClose,
    mode: editedMode,
  });

  return (
    <AddEditModal
      schema={validationSchema}
      initialValues={initialValues}
      title="Edit mode"
      okText="Update"
      visible={!!editedMode}
      onCancel={onClose}
      onSubmit={(values, formikHelpers) =>
        updateMode({
          values,
          formikHelpers,
        })
      }
    >
      <ModeForm />
    </AddEditModal>
  );
};

export default EditModeModal;
