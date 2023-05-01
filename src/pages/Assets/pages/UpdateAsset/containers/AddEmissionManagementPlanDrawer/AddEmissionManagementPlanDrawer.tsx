import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import { EmissionManagementPlanDetails } from 'api/schema';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useAddEmissionManagementPlan from 'pages/Assets/pages/UpdateAsset/hooks/useAddEmissionManagementPlan';
import useActiveBaselineId from 'pages/Assets/pages/UpdateAsset/hooks/useActiveBaselineId';
import EmissionManagementPlanForm, {
  FormValues,
} from '../EmissionManagementPlanForm';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';

const AddEmissionManagementPlanDrawer = () => {
  const { onCloseDrawer } = useAddEditActions<UpdateAssetAddEditActionContext>(
    'emissionManagementPlans',
  );
  const assetId = useAssetId();
  const activeBaselineId = useActiveBaselineId();
  const {
    validationSchema,
    addEmissionManagementPlanMutation: {
      mutateAsync: onAddEmissionManagementPlan,
      isLoading: isAddingEmissionManagementPlan,
    },
    initialValues,
  } = useAddEmissionManagementPlan({
    onSuccess: onCloseDrawer,
    assetId,
    baselineId: activeBaselineId,
  });

  return (
    <AddFormDrawer<
      FormValues,
      EmissionManagementPlanDetails,
      UpdateAssetAddEditActionContext
    >
      title="Add energy management plan (EMP)"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onAddEmissionManagementPlan}
      isSubmitting={isAddingEmissionManagementPlan}
      width={1162}
      context="emissionManagementPlans"
    >
      <EmissionManagementPlanForm />
    </AddFormDrawer>
  );
};

export default AddEmissionManagementPlanDrawer;
