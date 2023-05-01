import { Col } from 'antd';
import { ConceptWellDetails, CustomWellDetails } from 'api/schema';
import Box from 'components/Box';
import { DetailItem, DetailItemsProvider } from 'components/DetailItem';
import Modal from 'components/Modal';
import Result from 'components/Result';
import { WELL_LABELS as labels } from 'consts/wells';
import CompletionData from 'containers/WellDetails/CompletionData';
import DrillingSettings from 'containers/WellDetails/DrillingSettings';
import GeneralInformation from 'containers/WellDetails/GeneralInformation';

interface WellDetailsModalProps {
  data?: CustomWellDetails | ConceptWellDetails;
  loading?: boolean;
  error?: boolean;
  onClose: () => void;
  visible?: boolean;
  title?: string;
}

const WellDetailsModal = ({
  data,
  loading,
  error,
  onClose,
  visible,
  title,
}: WellDetailsModalProps) => {
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
        <Result status="error" subTitle="Unable to load well details" />
      ) : (
        <DetailItemsProvider loading={!!loading} layout="vertical">
          <Box marginBottom={20}>
            <GeneralInformation gutter={[24, 30]} data={data}>
              <>
                <Col span={6}>
                  <DetailItem label={labels.name} value={data?.name} />
                </Col>
                <Col span={18} />
              </>
            </GeneralInformation>

            <Box marginTop={30}>
              <DrillingSettings gutter={[24, 30]} data={data} />
            </Box>

            <Box marginTop={30}>
              <CompletionData gutter={[24, 30]} data={data} />
            </Box>
          </Box>
        </DetailItemsProvider>
      )}
    </Modal>
  );
};

export default WellDetailsModal;
