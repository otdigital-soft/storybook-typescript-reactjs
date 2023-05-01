import { Col, Row } from 'antd';
import { ConceptSemiRigDetails, CustomSemiRigDetails } from 'api/schema';
import Box from 'components/Box';
import { DetailItem, DetailItemsProvider } from 'components/DetailItem';
import Modal from 'components/Modal';
import Result from 'components/Result';
import Capacities from 'containers/SemiRigDetails/Capacities';
import GeneralInformation from 'containers/SemiRigDetails/GeneralInformation';
import OperationEmission from 'containers/SemiRigDetails/OperationEmission';

interface SemiRigDetailsModalProps {
  rig?: CustomSemiRigDetails | ConceptSemiRigDetails;
  loading?: boolean;
  error?: boolean;
  onClose: () => void;
  visible?: boolean;
  title?: React.ReactNode;
}

const SemiRigDetailsModal = ({
  rig,
  loading,
  error,
  onClose,
  visible,
  title,
}: SemiRigDetailsModalProps) => {
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
                <DetailItem label="Rig type" value="Semi" />
              </Col>
              <Col span={6}>
                <DetailItem label={'Rig name'} value={rig?.name} />
              </Col>
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

export default SemiRigDetailsModal;
