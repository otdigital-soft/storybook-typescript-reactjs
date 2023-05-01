import useCreateWellForm from 'containers/CreateWellForm/useCreateWellForm';
import Box from 'components/Box';
import { Title } from 'components/Typography';
import { DraftType } from './CreateWellFormProvider';
import SelectConceptWellList from './SelectConceptWellList';
import SelectCustomWellList from './SelectCustomWellList';

const SelectWellStep = () => {
  const { draftType } = useCreateWellForm();
  return (
    <>
      <Box marginBottom={20}>
        <Title level={5} type="secondary">
          Select {draftType?.toLowerCase()} well data
        </Title>
      </Box>
      {draftType === DraftType.Concept ? <SelectConceptWellList /> : null}
      {draftType === DraftType.Custom ? <SelectCustomWellList /> : null}
    </>
  );
};

export default SelectWellStep;
