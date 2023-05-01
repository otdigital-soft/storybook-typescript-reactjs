import {
  AddEditSelectProvider,
  useAddEditSelect,
} from 'components/AddEditSelect';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import { AddEditSelectOptionType } from 'components/AddEditSelect';
import usePhases from 'pages/Assets/pages/UpdateAsset/hooks/usePhases';
import AddPhaseModal from '../AddPhaseModal';
import EditPhaseModal from '../EditPhaseModal';
import InputSelect from '../../components/InputSelect';
import { PlusOutlined } from '@ant-design/icons';
import useUpdateBaselineInput from 'pages/Assets/pages/UpdateAsset/hooks/useUpdateBaselineInput';
import { Season } from 'pages/Assets/pages/UpdateAsset/containers/BaselineForm';

const PhaseSelect = ({ season }: { season: Season }) => {
  const assetId = useAssetId();
  const { data: phasesData } = usePhases(assetId);
  const { addPhase, seasonValues } = useUpdateBaselineInput(season);
  const phasesOptions: AddEditSelectOptionType[] =
    phasesData?.map((phase) => ({
      label: phase.name,
      value: phase.id,
      editable: phase.custom,
      disabled: seasonValues.phases.includes(phase.id),
    })) || [];
  const { onAdd, onEdit } = useAddEditSelect();

  return (
    <>
      <InputSelect
        value={null}
        options={phasesOptions}
        placeholder="Add phase"
        addNewLabel="Add new phase"
        onEdit={onEdit}
        onAdd={onAdd}
        suffixIcon={<PlusOutlined />}
        onChange={(value) => addPhase(value)}
      />
      <AddPhaseModal />
      <EditPhaseModal />
    </>
  );
};

const DefaultPhaseSelect = ({ season }: { season: Season }) => {
  return (
    <AddEditSelectProvider>
      <PhaseSelect season={season} />
    </AddEditSelectProvider>
  );
};

export default DefaultPhaseSelect;
