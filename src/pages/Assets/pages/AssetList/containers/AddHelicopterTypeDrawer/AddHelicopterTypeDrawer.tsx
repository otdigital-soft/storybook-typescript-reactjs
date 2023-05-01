import { HelicopterTypeList } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import useAddHelicopterType from '../../hooks/useAddHelicopterType';
import HelicopterTypeForm, { FormValues } from '../HelicopterTypeForm';
import { AssetListAddEditActionContext } from 'pages/Assets/pages/AssetList/types';

const AddHelicopterTypeDrawer = () => {
  const { onCloseDrawer } =
    useAddEditActions<AssetListAddEditActionContext>('helicopters');
  const {
    validationSchema,
    addHelicopterTypeMutation: {
      mutateAsync: onAddHelicopterType,
      isLoading: isAddingHelicopterType,
    },
    initialValues,
  } = useAddHelicopterType({
    onSuccess: onCloseDrawer,
  });

  return (
    <AddFormDrawer<
      FormValues,
      HelicopterTypeList,
      AssetListAddEditActionContext
    >
      title="Add helicopter type"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onAddHelicopterType}
      isSubmitting={isAddingHelicopterType}
      width={600}
      context="helicopters"
    >
      <HelicopterTypeForm />
    </AddFormDrawer>
  );
};

export default AddHelicopterTypeDrawer;
