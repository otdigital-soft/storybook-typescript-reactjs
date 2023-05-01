import {
  AddEditSelectProvider,
  useAddEditSelect,
} from 'components/AddEditSelect';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import { AddEditSelectOptionType } from 'components/AddEditSelect';
import useModes from 'pages/Assets/pages/UpdateAsset/hooks/useModes';
import AddModeModal from '../AddModeModal';
import EditModeModal from '../EditModeModal';
import InputSelect from '../../components/InputSelect';
import { PlusOutlined } from '@ant-design/icons';
import useUpdateBaselineInput from 'pages/Assets/pages/UpdateAsset/hooks/useUpdateBaselineInput';
import { Season } from 'pages/Assets/pages/UpdateAsset/containers/BaselineForm';

const ModeSelect = ({ season }: { season: Season }) => {
  const assetId = useAssetId();
  const { data: modesData } = useModes(assetId);
  const { addMode, seasonValues } = useUpdateBaselineInput(season);
  const options: AddEditSelectOptionType[] =
    modesData?.map((mode) => ({
      label: mode.name,
      value: mode.id,
      editable: mode.custom,
      disabled: seasonValues.modes.includes(mode.id),
    })) || [];
  const { onAdd, onEdit } = useAddEditSelect();

  return (
    <>
      <InputSelect
        value={null}
        options={options}
        placeholder="Add mode"
        addNewLabel="Add new mode"
        onEdit={onEdit}
        onAdd={onAdd}
        suffixIcon={<PlusOutlined />}
        onChange={(value) => addMode(value)}
      />
      <AddModeModal />
      <EditModeModal />
    </>
  );
};

const DefaultModeSelect = ({ season }: { season: Season }) => {
  return (
    <AddEditSelectProvider>
      <ModeSelect season={season} />
    </AddEditSelectProvider>
  );
};

export default DefaultModeSelect;
