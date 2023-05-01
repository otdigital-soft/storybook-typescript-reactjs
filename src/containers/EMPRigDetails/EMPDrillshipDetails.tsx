import { Col } from 'antd';
import { CustomDrillshipDetails } from 'api/schema';
import Box from 'components/Box';
import { DetailItem, DetailItemsProvider } from 'components/DetailItem';
import { Row } from 'components/Grid';
import { Title } from 'components/Typography';
import GeneralInformation from 'containers/DrillshipDetails/GeneralInformation';

interface EMPDrillshipDetailsProps {
  rigData: CustomDrillshipDetails;
}

export const EMPDrillshipDetails = ({ rigData }: EMPDrillshipDetailsProps) => {
  return (
    <Box>
      <Title level={5} type="secondary">
        Rig Details
      </Title>
      <Box marginTop={8} marginBottom={20}>
        Rig parameters
      </Box>
      <Row gutter={[24, 21]}>
        <DetailItemsProvider loading={false} layout="vertical">
          <>
            <Col span={6}>
              <DetailItem label="Type" value="Drillship" />
            </Col>
            <GeneralInformation rig={rigData} />
          </>
        </DetailItemsProvider>
      </Row>
    </Box>
  );
};
