import { CustomWellDetails } from 'api/schema';
import Box from 'components/Box';
import { DetailItemsProvider } from 'components/DetailItem';
import Divider from 'components/Divider';
import { Title } from 'components/Typography';
import GeneralInformation from 'containers/WellDetails/GeneralInformation';
import CompletionData from './CompletionData';
import DrillingSettings from './DrillingSettings';

interface WellDetailsProps {
  loading: boolean;
  data: CustomWellDetails | undefined;
}

const WellDetails = ({ loading, data }: WellDetailsProps) => {
  return (
    <DetailItemsProvider loading={loading} layout="vertical">
      <>
        <Box marginBottom={20}>
          <Title level={5} type="secondary">
            Well Details
          </Title>
          <Box marginTop={8}>General information</Box>
        </Box>

        <GeneralInformation gutter={[24, 18]} data={data} />

        <Box paddingY={20}>
          <Divider />
        </Box>
        <Box marginBottom={20}>
          <Title level={5} type="secondary">
            Drilling settings
          </Title>
        </Box>

        <DrillingSettings gutter={[24, 18]} data={data} />

        <Box paddingY={20}>
          <Divider />
        </Box>
        <Box marginBottom={20}>
          <Title level={5} type="secondary">
            Completion data
          </Title>
        </Box>

        <CompletionData gutter={[24, 18]} data={data} />
      </>
    </DetailItemsProvider>
  );
};

export default WellDetails;
