import { useAddEditActions } from 'containers/AddEditActionsProvider';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import { EmissionManagementPlanDetails } from 'api/schema';
import { EditFormDrawer } from 'containers/FormDrawer';
import EmissionManagementPlanForm, {
  FormValues,
} from '../EmissionManagementPlanForm';
import Box from 'components/Box';
import { Text } from 'components/Typography';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { MODIFIED_TIME_FORMAT } from 'pages/Assets/pages/UpdateAsset/consts';
import useEmissionManagementPlan from 'pages/Assets/pages/UpdateAsset/hooks/useEmissionManagementPlan';
import useActiveBaselineId from 'pages/Assets/pages/UpdateAsset/hooks/useActiveBaselineId';
import useUpdateEmissionManagementPlan from 'pages/Assets/pages/UpdateAsset/hooks/useUpdateEmissionManagementPlan';
import EmissionReductionInitiatives from '../EmissionReductionInitiatives';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';

const EditEmissionManagementPlanDrawer = () => {
  const { onCloseDrawer, editedRow: editedEmissionManagementPlanId } =
    useAddEditActions<UpdateAssetAddEditActionContext>(
      'emissionManagementPlans',
    );
  const assetId = useAssetId();
  const activeBaselineId = useActiveBaselineId();
  const {
    data: emissionManagementPlanData,
    isLoading: isLoadingEmissionManagementPlan,
  } = useEmissionManagementPlan({
    assetId,
    baselineId: activeBaselineId,
    emissionManagementPlanId: editedEmissionManagementPlanId,
  });
  const {
    validationSchema,
    initialValues,
    updateEmissionManagementPlanMutation: {
      mutateAsync: onEditEmissionManagementPlan,
      isLoading: isEditingEmissionManagementPlan,
    },
  } = useUpdateEmissionManagementPlan({
    onSuccess: onCloseDrawer,
    assetId,
    baselineId: activeBaselineId,
    emissionManagementPlan: emissionManagementPlanData,
  });
  return (
    <EditFormDrawer<
      FormValues,
      EmissionManagementPlanDetails,
      UpdateAssetAddEditActionContext
    >
      title="Edit energy management plan (EMP)"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onEditEmissionManagementPlan}
      isSubmitting={isEditingEmissionManagementPlan}
      width={1162}
      loading={isLoadingEmissionManagementPlan || !emissionManagementPlanData}
      context="emissionManagementPlans"
    >
      <>
        {emissionManagementPlanData ? (
          <Text strong>
            Modified:{' '}
            {format(
              parseISO(emissionManagementPlanData.updated_at),
              MODIFIED_TIME_FORMAT,
            )}
          </Text>
        ) : null}
        <Box marginTop={8}>
          <EmissionManagementPlanForm />
          <Box marginTop={8}>
            <EmissionReductionInitiatives />
          </Box>
        </Box>
      </>
    </EditFormDrawer>
  );
};

export default EditEmissionManagementPlanDrawer;
