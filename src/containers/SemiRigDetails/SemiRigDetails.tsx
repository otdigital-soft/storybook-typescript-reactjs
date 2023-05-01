import { Col, Row } from 'antd';
import { CustomSemiRigDetails } from 'api/schema';
import Box from 'components/Box';
import { DetailItem, DetailItemsProvider } from 'components/DetailItem';
import Divider from 'components/Divider';
import { Title } from 'components/Typography';
import Capacities from './Capacities';
import GeneralInformation from './GeneralInformation';
import OperationEmission from './OperationEmission';

interface SemiRigDetailsProps {
  loading: boolean;
  semiRigData?: CustomSemiRigDetails;
}

const SemiRigDetails = ({ semiRigData, loading }: SemiRigDetailsProps) => {
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
            <DetailItem label={'Rig type'} value={'Semi'} />
          </Col>
          <GeneralInformation rig={semiRigData} />
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
          <Capacities rig={semiRigData} />
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
          <OperationEmission rig={semiRigData} />
        </Row>
      </Box>
    </DetailItemsProvider>
  );
};

export default SemiRigDetails;
