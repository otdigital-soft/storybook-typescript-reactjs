import { Col, Row } from 'antd';
import { ConceptJackupRigDetails, CustomJackupRigDetails } from 'api/schema';
import Box from 'components/Box';
import { DetailItem, DetailItemsProvider } from 'components/DetailItem';
import Modal from 'components/Modal';
import Result from 'components/Result';
import Capacities from 'containers/JackupRigDetails/Capacities';
import GeneralInformation from 'containers/JackupRigDetails/GeneralInformation';
import OperationEmission from 'containers/JackupRigDetails/OperationEmission';

interface JackupRigDetailsModalProps {
  rig?: CustomJackupRigDetails | ConceptJackupRigDetails;
  loading?: boolean;
  error?: boolean;
  onClose: () => void;
  visible?: boolean;
  title?: React.ReactNode;
}

const JackupRigDetailsModal = ({
  rig,
  loading,
  error,
  onClose,
  visible,
  title,
}: JackupRigDetailsModalProps) => {
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
          <Box marginBottom={20}>
            <Row gutter={[24, 30]}>
              <Col span={6}>
                <DetailItem label={'Rig type'} value={'Jackup'} />
              </Col>
              <Col span={6}>
                <DetailItem label={'Rig name'} value={rig?.name} />
              </Col>
              <Col span={12} />
              <GeneralInformation rig={rig} />
              <Capacities rig={rig} />
              <OperationEmission rig={rig} />
            </Row>
          </Box>
        </DetailItemsProvider>
      )}
    </Modal>
  );
};

export default JackupRigDetailsModal;
