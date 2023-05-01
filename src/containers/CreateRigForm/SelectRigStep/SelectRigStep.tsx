import Box from 'components/Box';
import { Title } from 'components/Typography';
import useCreateRigForm, {
  CreateRigDraftType,
  CreateRigType,
} from '../useCreateRigForm';
import {
  SelectConceptJackupRigList,
  SelectConceptSemiRigList,
  SelectCustomJackupRigList,
  SelectCustomSemiRigList,
  SelectConceptDrillshipList,
  SelectCustomDrillshipList,
} from './SelectRigList';

const SelectRigStep = () => {
  const { draftType, rigType } = useCreateRigForm();

  return (
    <>
      <Box marginTop={8} marginBottom={20}>
        <Title level={5} type="secondary">
          Select {draftType?.toLowerCase()} rig data
        </Title>
      </Box>
      {draftType === CreateRigDraftType.Concept &&
      rigType === CreateRigType.Jackup ? (
        <SelectConceptJackupRigList />
      ) : null}
      {draftType === CreateRigDraftType.Custom &&
      rigType === CreateRigType.Jackup ? (
        <SelectCustomJackupRigList />
      ) : null}
      {draftType === CreateRigDraftType.Concept &&
      rigType === CreateRigType.Semi ? (
        <SelectConceptSemiRigList />
      ) : null}
      {draftType === CreateRigDraftType.Custom &&
      rigType === CreateRigType.Semi ? (
        <SelectCustomSemiRigList />
      ) : null}
      {draftType === CreateRigDraftType.Concept &&
      rigType === CreateRigType.Drillship ? (
        <SelectConceptDrillshipList />
      ) : null}
      {draftType === CreateRigDraftType.Custom &&
      rigType === CreateRigType.Drillship ? (
        <SelectCustomDrillshipList />
      ) : null}
    </>
  );
};

export default SelectRigStep;
