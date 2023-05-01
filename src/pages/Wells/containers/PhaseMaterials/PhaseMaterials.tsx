import { Col } from 'antd';
import Box from 'components/Box';
import { Row } from 'components/Grid';
import { Text, Title } from 'components/Typography';
import { useFormikContext } from 'formik';
import usePhaseMaterialsColumns from 'pages/Wells/hooks/usePhaseMaterialsColumns';
import { FormValues } from '../PhaseForm/form';
import {
  AddMaterialButton,
  PhaseMaterialsTable,
} from './PhaseMaterials.styled';
import { PlusOutlined } from '@ant-design/icons';

const PhaseMaterials = () => {
  const { columns, addMaterial } = usePhaseMaterialsColumns();
  const { values } = useFormikContext<FormValues>();

  return (
    <>
      <Box marginBottom={20}>
        <Title level={5}>Materials</Title>
      </Box>
      <Row>
        {values.materials.length === 0 ? null : (
          <Col span={24}>
            <PhaseMaterialsTable
              pagination={false}
              loading={false}
              columns={columns}
              dataSource={values.materials}
              tableLayout="fixed"
              rowKey={(_, index) => String(index)}
            />
          </Col>
        )}
        <Col span={12}>
          <Box marginBottom={3}>
            <Text>Add new material</Text>
          </Box>
          <AddMaterialButton
            icon={<PlusOutlined />}
            onClick={() => addMaterial()}
          >
            Add new material
          </AddMaterialButton>
        </Col>
      </Row>
    </>
  );
};

export default PhaseMaterials;
