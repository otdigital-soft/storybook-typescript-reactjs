import { DeleteColumnOutlined } from '@ant-design/icons';

import { Col, Row } from 'antd';
import Box from 'components/Box';
import ElementCard from 'components/ElementCard';
import { Title } from 'components/Typography';
import useCreateRigForm, { CreateRigType } from '../useCreateRigForm';

const SelectRigTypeStep = () => {
  const { onRigTypeChange, rigType } = useCreateRigForm();

  return (
    <>
      <Box marginTop={8} marginBottom={20}>
        <Title level={5} type="secondary">
          Select rig type
        </Title>
      </Box>
      <Row gutter={[24, 18]}>
        <Col span={8}>
          <ElementCard
            active={rigType === CreateRigType.Jackup}
            icon={<DeleteColumnOutlined />}
            title="Jackup Rig"
            description="Description of a jackup rig"
            onClick={() => onRigTypeChange(CreateRigType.Jackup)}
          />
        </Col>
        <Col span={8}>
          <ElementCard
            active={rigType === CreateRigType.Semi}
            icon={<DeleteColumnOutlined />}
            title="Semi Rig"
            description="Description of a semi rig"
            onClick={() => onRigTypeChange(CreateRigType.Semi)}
          />
        </Col>
        <Col span={8}>
          <ElementCard
            active={rigType === CreateRigType.Drillship}
            icon={<DeleteColumnOutlined />}
            title="Drillship"
            description="Description of a drillship"
            onClick={() => onRigTypeChange(CreateRigType.Drillship)}
          />
        </Col>
      </Row>
    </>
  );
};

export default SelectRigTypeStep;
