import { Col, Row } from 'antd';
import { ConceptDrillshipDetails, CustomDrillshipDetails } from 'api/schema';
import Box from 'components/Box';
import { DetailItem, DetailItemsProvider } from 'components/DetailItem';
import Modal from 'components/Modal';
import Result from 'components/Result';
import Capacities from 'containers/DrillshipDetails/Capacities';
import GeneralInformation from 'containers/DrillshipDetails/GeneralInformation';
import OperatorEmission from 'containers/DrillshipDetails/OperatorEmission';

interface DrillshipDetailsModalProps {
  rig?: CustomDrillshipDetails | ConceptDrillshipDetails;
  loading?: boolean;
  error?: boolean;
  onClose: () => void;
  visible?: boolean;
  title?: React.ReactNode;
}

const DrillshipDetailsModal = ({
  rig,
  loading,
  error,
  onClose,
  visible,
  title,
}: DrillshipDetailsModalProps) => {
  return (
    <Modal
      width={1160}
      centered
      title={title}
      visible={visible}
      onOk={() => onClose()}
      onCancel={() => onClose()}
      destroyOnClose={true}
    >
      {error ? (
        <Result status="error" subTitle="Unable to load rig details" />
      ) : (
        <DetailItemsProvider loading={!!loading} layout="vertical">
          <Box>
            <Row gutter={[24, 30]}>
              <Col span={6}>
                <DetailItem label="Rig type" value="Drillship" />
              </Col>
              <Col span={6}>
                <DetailItem label={'Rig name'} value={rig?.name} />
              </Col>
              <Col span={12} />

              <GeneralInformation rig={rig} />

              <Capacities rig={rig} />

              <Col span={12} />

              <OperatorEmission rig={rig} />
            </Row>
          </Box>
        </DetailItemsProvider>
      )}
    </Modal>
  );
};

export default DrillshipDetailsModal;
