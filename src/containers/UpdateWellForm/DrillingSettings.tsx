import Box from 'components/Box';
import { Title } from 'components/Typography';
import DrillingSettingsForm from 'containers/UpdateWellForm/DrillingSettingsForm';

const DrillingSettings = () => {
  return (
    <>
      <Box mb={20}>
        <Title level={5} type="secondary">
          Drilling settings (optional)
        </Title>
      </Box>

      <DrillingSettingsForm />
    </>
  );
};
export default DrillingSettings;
