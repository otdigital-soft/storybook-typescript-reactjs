import Box from 'components/Box';
import { Title } from 'components/Typography';
import CompletionDataForm from './CompletionDataForm';

const CompletionData = () => {
  return (
    <>
      <Box mb={20}>
        <Title level={5} type="secondary">
          Completion data
        </Title>
      </Box>
      <CompletionDataForm />
    </>
  );
};

export default CompletionData;
