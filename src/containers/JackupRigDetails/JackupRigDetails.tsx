import { Col, Row } from 'antd';
import { CustomJackupRigDetails } from 'api/schema';
import Box from 'components/Box';
import { DetailItem, DetailItemsProvider } from 'components/DetailItem';
import Divider from 'components/Divider';
import { Title } from 'components/Typography';
import Capacities from './Capacities';
import GeneralInformation from './GeneralInformation';
import OperationEmission from './OperationEmission';

interface JackupRigDetailsProps {
  loading: boolean;
  jackupRigData?: CustomJackupRigDetails;
}

const JackupRigDetails = ({
  jackupRigData,
  loading,
}: JackupRigDetailsProps) => {
  return (
    <DetailItemsProvider loading={loading} layout="vertical">
      <Box paddingY={20} paddingX={24}>
        <Box marginBottom={20}>
          <Title level={5} type="secondary">
            Rig Details
          </Title>
          General information
        </Box>
        <Row gutter={[24, 18]}>
          <Col span={6}>
            <DetailItem label={'Rig type'} value={'Jackup'} />
          </Col>
          <GeneralInformation rig={jackupRigData} />
        </Row>
        <Box paddingY={20}>
          <Divider />
        </Box>
        <Box marginBottom={20}>
          <Title level={5} type="secondary">
            Capacities
          </Title>
        </Box>
        <Row gutter={[24, 18]}>
          <Capacities rig={jackupRigData} />
        </Row>
        <Box paddingY={20}>
          <Divider />
        </Box>
        <Box marginBottom={20}>
          <Title level={5} type="secondary">
            Operation & emission
          </Title>
        </Box>
        <Row gutter={[24, 18]}>
          <OperationEmission rig={jackupRigData} />
        </Row>
      </Box>
    </DetailItemsProvider>
  );
};

export default JackupRigDetails;
