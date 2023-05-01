import { HelicopterTypeList } from 'api/schema';
import { usePaginationProvider } from 'components/PaginationProvider';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { EditFormDrawer } from 'containers/FormDrawer';
import useHelicopterTypes from 'pages/Assets/hooks/useHelicopterTypes';
import useEditHelicopterType from '../../hooks/useEditHelicopterType';
import HelicopterTypeForm, { FormValues } from '../HelicopterTypeForm';
import { AssetListAddEditActionContext } from 'pages/Assets/pages/AssetList/types';

const EditHelicopterTypeDrawer = () => {
  const { onCloseDrawer, editedRow: editedHelicopterType } =
    useAddEditActions<AssetListAddEditActionContext>('helicopters');
  const { page, pageSize } = usePaginationProvider();
  const { data: helicopterTypesData } = useHelicopterTypes({
    page,
    pageSize,
  });

  const helicopterTypeToEdit = editedHelicopterType
    ? helicopterTypesData?.results?.find(
        (helicopterType) => helicopterType.id === editedHelicopterType,
      )
    : undefined;
  const {
    validationSchema,
    editHelicopterTypeMutation: {
      mutateAsync: onEditHelicopterType,
      isLoading: isEditingHelicopterType,
    },
    initialValues,
  } = useEditHelicopterType({
    onSuccess: onCloseDrawer,
    helicopterType: helicopterTypeToEdit,
  });

  return (
    <EditFormDrawer<
      FormValues,
      HelicopterTypeList,
      AssetListAddEditActionContext
    >
      title="Edit helicopter type"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onEditHelicopterType}
      isSubmitting={isEditingHelicopterType}
      width={600}
      context="helicopters"
    >
      <HelicopterTypeForm />
    </EditFormDrawer>
  );
};

export default EditHelicopterTypeDrawer;
