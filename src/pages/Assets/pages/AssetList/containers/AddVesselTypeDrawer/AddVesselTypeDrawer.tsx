import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import { VesselTypeList } from 'api/schema';
import useAddVesselType from '../../hooks/useAddVesselType';
import VesselTypeForm, { FormValues } from '../VesselTypeForm';
import { AssetListAddEditActionContext } from 'pages/Assets/pages/AssetList/types';

const AddVesselTypeDrawer = () => {
  const { onCloseDrawer } =
    useAddEditActions<AssetListAddEditActionContext>('vessels');
  const {
    validationSchema,
    addVesselTypeMutation: {
      mutateAsync: onAddVesselType,
      isLoading: isAddingVesselType,
    },
    initialValues,
  } = useAddVesselType({
    onSuccess: onCloseDrawer,
  });

  return (
    <AddFormDrawer<FormValues, VesselTypeList, AssetListAddEditActionContext>
      title="Add vessel type"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onAddVesselType}
      isSubmitting={isAddingVesselType}
      width={600}
      context="vessels"
    >
      <VesselTypeForm />
    </AddFormDrawer>
  );
};

export default AddVesselTypeDrawer;
