import { Col, Row } from 'antd';
import { Text, Title } from 'components/Typography';
import Box from 'components/Box';

interface EMPRigDetailsProps {
  parameters: { title: string; description: string | number }[];
}

const EMPRigDetails = ({ parameters }: EMPRigDetailsProps) => {
  return (
    <Box>
      <Title level={5} type="secondary">
        Rig Details
      </Title>
      <Box marginTop={8} marginBottom={20}>
        Rig parameters
      </Box>
      <Row gutter={[24, 21]}>
        {parameters.map((parameter) => (
          <Col span={6} key={parameter.title}>
            <Text strong>{parameter.title}</Text>
            <Box>{parameter.description}</Box>
          </Col>
        ))}
      </Row>
    </Box>
  );
};

export default EMPRigDetails;
