import Box from 'components/Box';
import { Title } from 'components/Typography';
import CompletionDataForm from 'containers/UpdateWellForm/CompletionDataForm';

const AdditionalDataStep = () => {
  return (
    <>
      <Box mb={20}>
        <Title level={5} type="secondary">
          Additional data
        </Title>
      </Box>
      <CompletionDataForm />
    </>
  );
};

export default AdditionalDataStep;
