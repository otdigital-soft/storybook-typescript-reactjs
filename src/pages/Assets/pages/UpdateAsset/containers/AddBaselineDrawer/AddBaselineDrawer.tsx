import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AddFormDrawer } from 'containers/FormDrawer';
import { BaselineDetails } from 'api/schema';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useAddBaseline from '../../hooks/useAddBaseline';
import BaselineForm, {
  FormValues,
} from 'pages/Assets/pages/UpdateAsset/containers/BaselineForm';
import useDimensions from 'hooks/useDimensions';
import { Flexbox } from 'components/Box';
import InputsHeightProvider from 'pages/Assets/pages/UpdateAsset/containers/InputsHeightProvider';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';
import usePhases from 'pages/Assets/pages/UpdateAsset/hooks/usePhases';
import useModes from 'pages/Assets/pages/UpdateAsset/hooks/useModes';

const AddBaselineDrawer = () => {
  const { onCloseDrawer } =
    useAddEditActions<UpdateAssetAddEditActionContext>('baselines');
  const assetId = useAssetId();
  const { data: phasesData } = usePhases(assetId);
  const { data: modesData } = useModes(assetId);
  const {
    validationSchema,
    addBaselineMutation: {
      mutateAsync: onAddBaseline,
      isLoading: isAddingBaseline,
    },
    initialValues,
  } = useAddBaseline({
    onSuccess: onCloseDrawer,
    assetId,
    initialPhases: (phasesData || [])
      .filter((phase) => !phase.custom)
      .map((phase) => phase.id),
    initialModes: (modesData || [])
      .filter((mode) => !mode.custom)
      .map((mode) => mode.id),
  });
  const [ref, size] = useDimensions<HTMLDivElement>();

  return (
    <AddFormDrawer<FormValues, BaselineDetails, UpdateAssetAddEditActionContext>
      title="Add baseline"
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onAddBaseline}
      isSubmitting={isAddingBaseline}
      width={816}
      validateOnChange={false}
      context="baselines"
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Flexbox flexDirection="column" flexGrow={1} overflow="hidden" ref={ref}>
        <InputsHeightProvider height={size ? size.height - 297 : size}>
          <BaselineForm />
        </InputsHeightProvider>
      </Flexbox>
    </AddFormDrawer>
  );
};

export default AddBaselineDrawer;
