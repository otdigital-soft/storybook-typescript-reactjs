import { MaterialTypeList } from 'api/schema';
import { usePaginationProvider } from 'components/PaginationProvider';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { EditFormDrawer } from 'containers/FormDrawer';
import useMaterialTypes from 'pages/Assets/hooks/useMaterialTypes';
import useEditMaterialType from '../../hooks/useEditMaterialType';
import { AssetListAddEditActionContext } from '../../types';
import MaterialTypeForm, { FormValues } from '../MaterialTypeForm';

const EditMaterialTypeDrawer = () => {
  const { onCloseDrawer, editedRow: editedMaterialType } =
    useAddEditActions<AssetListAddEditActionContext>('materials');
  const { page, pageSize } = usePaginationProvider();
  const { data: materialTypesData } = useMaterialTypes({
    page,
    pageSize,
  });

  const materialTypeToEdit = editedMaterialType
    ? materialTypesData?.results?.find(
        (materialType) => materialType.id === editedMaterialType,
      )
    : undefined;
  const {
    validationSchema,
    editMaterialTypeMutation: {
      mutateAsync: onEditMaterialType,
      isLoading: isEditingMaterialType,
    },
    initialValues,
  } = useEditMaterialType({
    onSuccess: onCloseDrawer,
    materialType: materialTypeToEdit,
  });

  return (
    <EditFormDrawer<FormValues, MaterialTypeList, AssetListAddEditActionContext>
      title="Edit material type"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onEditMaterialType}
      isSubmitting={isEditingMaterialType}
      width={600}
      context="materials"
    >
      <MaterialTypeForm edit />
    </EditFormDrawer>
  );
};

export default EditMaterialTypeDrawer;
