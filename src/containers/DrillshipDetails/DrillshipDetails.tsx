import { Col, Row } from 'antd';
import { CustomDrillshipDetails } from 'api/schema';
import Box from 'components/Box';
import { DetailItem, DetailItemsProvider } from 'components/DetailItem';
import Divider from 'components/Divider';
import { Title } from 'components/Typography';
import Capacities from 'containers/DrillshipDetails/Capacities';
import OperatorEmission from 'containers/DrillshipDetails/OperatorEmission';
import GeneralInformation from './GeneralInformation';

interface DrillshipDetailsProps {
  loading: boolean;
  drillshipData?: CustomDrillshipDetails;
}

const DrillshipDetails = ({
  drillshipData,
  loading,
}: DrillshipDetailsProps) => {
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
            <DetailItem label={'Rig type'} value={'Drillship'} />
          </Col>
          <GeneralInformation rig={drillshipData} />
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
          <Capacities rig={drillshipData} />
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
          <OperatorEmission rig={drillshipData} />
        </Row>
      </Box>
    </DetailItemsProvider>
  );
};

export default DrillshipDetails;
