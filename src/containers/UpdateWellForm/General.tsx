import Box from 'components/Box';
import { Title } from 'components/Typography';
import GeneralForm from 'containers/UpdateWellForm/GeneralForm';

const General = () => {
  return (
    <>
      <Box mb={20}>
        <Title level={5} type="secondary">
          General
        </Title>
      </Box>

      <GeneralForm />
    </>
  );
};

export default General;
