import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useDimensions from 'hooks/useDimensions';
import { EditFormDrawer } from 'containers/FormDrawer';
import { EmissionReductionInitiativeDetails } from 'api/schema';
import { Flexbox } from 'components/Box';
import InputsHeightProvider from 'pages/Assets/pages/UpdateAsset/containers/InputsHeightProvider';
import useActiveBaselineId from 'pages/Assets/pages/UpdateAsset/hooks/useActiveBaselineId';
import useEmissionReductionInitiative from '../../hooks/useEmissionReductionInitiative';
import EmissionReductionInitiativeForm, {
  FormValues,
} from '../EmissionReductionInitiativeForm';
import useUpdateEmissionReductionInitiative from '../../hooks/useUpdateEmissionReductionInitiative';
import useBaselinePhases from 'pages/Assets/pages/UpdateAsset/hooks/useBaselinePhases';
import useBaselineModes from 'pages/Assets/pages/UpdateAsset/hooks/useBaselineModes';

const EditEmissionReductionInitiativeDrawer = () => {
  const { onCloseDrawer } = useAddEditActions<UpdateAssetAddEditActionContext>(
    'emissionReductionInitiatives',
  );
  const assetId = useAssetId();
  const activeBaselineId = useActiveBaselineId();
  const { editedRow: editedEmissionManagementPlanId } =
    useAddEditActions<UpdateAssetAddEditActionContext>(
      'emissionManagementPlans',
    );
  const { editedRow: editedEmissionReductionInitiativeId } =
    useAddEditActions<UpdateAssetAddEditActionContext>(
      'emissionReductionInitiatives',
    );
  const {
    data: emissionReductionInitiativeData,
    isLoading: isLoadingEmissionReductionInitiative,
  } = useEmissionReductionInitiative({
    assetId,
    baselineId: activeBaselineId,
    emissionManagementPlanId: editedEmissionManagementPlanId,
    emissionReductionInitiativeId: editedEmissionReductionInitiativeId,
  });
  const { data: phasesData, isFetching: isFetchingPhases } = useBaselinePhases(
    assetId,
    activeBaselineId,
  );
  const { data: modesData, isFetching: isFetchingModes } = useBaselineModes(
    assetId,
    activeBaselineId,
  );
  const loading =
    isFetchingPhases ||
    !phasesData ||
    isFetchingModes ||
    !modesData ||
    isLoadingEmissionReductionInitiative ||
    !emissionReductionInitiativeData;
  const {
    validationSchema,
    initialValues,
    updateEmissionReductionInitiative: {
      mutateAsync: onUpdateEmissionReductionInitiative,
      isLoading: isUpdatingEmissionReductionInitiative,
    },
  } = useUpdateEmissionReductionInitiative({
    onSuccess: onCloseDrawer,
    assetId,
    baselineId: activeBaselineId,
    emissionManagementPlanId: editedEmissionManagementPlanId,
    emissionReductionInitiative: emissionReductionInitiativeData,
    modes: modesData || [],
    phases: phasesData || [],
  });
  const [ref, size] = useDimensions<HTMLDivElement>();
  return (
    <EditFormDrawer<
      FormValues,
      EmissionReductionInitiativeDetails,
      UpdateAssetAddEditActionContext
    >
      title="Edit energy reduction initiative (ERI)"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onUpdateEmissionReductionInitiative}
      isSubmitting={isUpdatingEmissionReductionInitiative}
      width={686}
      loading={loading}
      validateOnChange={false}
      context="emissionReductionInitiatives"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <>
        <Flexbox
          flexDirection="column"
          flexGrow={1}
          overflow="hidden"
          ref={ref}
        >
          <InputsHeightProvider height={size ? size.height - 416 : size}>
            <EmissionReductionInitiativeForm />
          </InputsHeightProvider>
        </Flexbox>
      </>
    </EditFormDrawer>
  );
};

export default EditEmissionReductionInitiativeDrawer;
