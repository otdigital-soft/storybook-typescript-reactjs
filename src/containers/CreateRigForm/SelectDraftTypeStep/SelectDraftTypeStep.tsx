import Box from 'components/Box';
import { Title } from 'components/Typography';
import useCreateRigForm, { CreateRigType } from '../useCreateRigForm';
import {
  SelectDrillshipDraftType,
  SelectJackupDraftType,
  SelectSemiDraftType,
} from './SelectDraftTypeList';

const SelectDraftTypeStep = () => {
  const { rigType } = useCreateRigForm();
  let selectDraftType = null;
  if (rigType === CreateRigType.Jackup) {
    selectDraftType = <SelectJackupDraftType />;
  } else if (rigType === CreateRigType.Semi) {
    selectDraftType = <SelectSemiDraftType />;
  } else if (rigType === CreateRigType.Drillship) {
    selectDraftType = <SelectDrillshipDraftType />;
  }

  return (
    <>
      <Box marginTop={8} marginBottom={20}>
        <Title level={5} type="secondary">
          Select rig type
        </Title>
      </Box>
      {selectDraftType}
    </>
  );
};

export default SelectDraftTypeStep;
