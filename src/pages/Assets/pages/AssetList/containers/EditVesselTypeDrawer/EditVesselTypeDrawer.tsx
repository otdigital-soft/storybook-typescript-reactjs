import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { EditFormDrawer } from 'containers/FormDrawer';
import { VesselTypeList } from 'api/schema';
import useEditVesselType from '../../hooks/useEditVesselType';
import VesselTypeForm, { FormValues } from '../VesselTypeForm';
import useVesselTypes from 'pages/Assets/hooks/useVesselTypes';
import useDeleteVesselType from '../../hooks/useDeleteVesselType';
import { usePaginationProvider } from 'components/PaginationProvider';
import { AssetListAddEditActionContext } from 'pages/Assets/pages/AssetList/types';

const EditVesselTypeDrawer = () => {
  const { onDeleteVesselType, isDeletingVesselType } = useDeleteVesselType();
  const { onCloseDrawer, editedRow: editedVesselType } =
    useAddEditActions<AssetListAddEditActionContext>('vessels');
  const { page, pageSize } = usePaginationProvider();
  const { data: vesselTypesData } = useVesselTypes({
    page,
    pageSize,
  });
  const vesselTypeToEdit = editedVesselType
    ? vesselTypesData?.results?.find(
        (vesselType) => vesselType.id === editedVesselType,
      )
    : undefined;
  const {
    validationSchema,
    editVesselTypeMutation: {
      mutateAsync: onEditVesselType,
      isLoading: isEditingVesselType,
    },
    initialValues,
  } = useEditVesselType({
    onSuccess: onCloseDrawer,
    vesselType: vesselTypeToEdit,
  });
  const onDelete = () => {
    if (!vesselTypeToEdit) {
      return;
    }
    onDeleteVesselType({
      vesselType: vesselTypeToEdit,
      onSuccess: () => {
        onCloseDrawer();
      },
    });
  };

  return (
    <EditFormDrawer<FormValues, VesselTypeList, AssetListAddEditActionContext>
      title="Edit vessel type"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onEditVesselType}
      isSubmitting={isEditingVesselType}
      isDeleting={isDeletingVesselType}
      onDelete={onDelete}
      width={600}
      context="vessels"
    >
      <VesselTypeForm />
    </EditFormDrawer>
  );
};

export default EditVesselTypeDrawer;
