import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import { EmissionReductionInitiativeDetails } from 'api/schema';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import EmissionReductionInitiativeForm, {
  FormValues,
} from 'pages/Assets/pages/UpdateAsset/containers/EmissionReductionInitiativeForm';
import useDimensions from 'hooks/useDimensions';
import { Flexbox } from 'components/Box';
import InputsHeightProvider from 'pages/Assets/pages/UpdateAsset/containers/InputsHeightProvider';
import useAddEmissionReductionInitiative from '../../hooks/useAddEmissionReductionInitiative';
import useBaselinePhases from 'pages/Assets/pages/UpdateAsset/hooks/useBaselinePhases';
import useBaselineModes from 'pages/Assets/pages/UpdateAsset/hooks/useBaselineModes';
import useActiveBaselineId from 'pages/Assets/pages/UpdateAsset/hooks/useActiveBaselineId';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';

const AddEmissionReductionInitiativeDrawer = () => {
  const { onCloseDrawer } = useAddEditActions<UpdateAssetAddEditActionContext>(
    'emissionReductionInitiatives',
  );
  const assetId = useAssetId();
  const activeBaselineId = useActiveBaselineId();
  const { data: phasesData, isFetching: isFetchingPhases } = useBaselinePhases(
    assetId,
    activeBaselineId,
  );
  const { data: modesData, isFetching: isFetchingModes } = useBaselineModes(
    assetId,
    activeBaselineId,
  );
  const loading =
    isFetchingPhases || !phasesData || isFetchingModes || !modesData;
  const { editedRow: editedEmissionManagementPlanId } =
    useAddEditActions<UpdateAssetAddEditActionContext>(
      'emissionManagementPlans',
    );
  const {
    validationSchema,
    addEmissionReductionInitiative: {
      mutateAsync: onAddEmissionReductionInitiative,
      isLoading: isAddingEmissionReductionInitiative,
    },
    initialValues,
  } = useAddEmissionReductionInitiative({
    onSuccess: onCloseDrawer,
    assetId,
    baselineId: activeBaselineId,
    emissionManagementPlanId: editedEmissionManagementPlanId,
    modes: modesData || [],
    phases: phasesData || [],
  });
  const [ref, size] = useDimensions<HTMLDivElement>();

  return (
    <AddFormDrawer<
      FormValues,
      EmissionReductionInitiativeDetails,
      UpdateAssetAddEditActionContext
    >
      title="Add energy reduction initiative (ERI)"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onAddEmissionReductionInitiative}
      isSubmitting={isAddingEmissionReductionInitiative}
      width={686}
      validateOnChange={false}
      loading={loading}
      context="emissionReductionInitiatives"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Flexbox flexDirection="column" flexGrow={1} overflow="hidden" ref={ref}>
        <InputsHeightProvider height={size ? size.height - 416 : size}>
          <EmissionReductionInitiativeForm />
        </InputsHeightProvider>
      </Flexbox>
    </AddFormDrawer>
  );
};

export default AddEmissionReductionInitiativeDrawer;
