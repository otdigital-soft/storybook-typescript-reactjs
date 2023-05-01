import { Col, Row } from 'antd';
import { ProjectDetails as ProjectDetailsData } from 'api/schema';
import Box, { Flexbox } from 'components/Box';
import { Text, Title } from 'components/Typography';
import { DATE_FORMAT_LONG } from 'consts';
import { PROJECT_LABELS as labels } from 'consts/projects';
import { dollarFormatter } from 'utils/currency';
import { formatDateString } from 'utils/date';

interface ProjectInfoProps {
  project: ProjectDetailsData;
}

const ProjectInfo = ({ project }: ProjectInfoProps) => {
  return (
    <Row gutter={52}>
      <Col span={13}>
        <Title level={5} type="secondary">
          Description
        </Title>
        <Box marginTop={18}>
          <Text type="secondary">{project.description}</Text>
        </Box>
      </Col>
      <Col span={11}>
        <Box marginBottom={18}>
          <Title level={5} type="secondary">
            Information
          </Title>
        </Box>
        <Row gutter={24}>
          <Col span={12}>
            <Flexbox flexDirection="column">
              <Text>{labels.created_at}</Text>
              <Text type="secondary">
                {formatDateString(project.created_at, DATE_FORMAT_LONG)}
              </Text>
            </Flexbox>
            <Flexbox flexDirection="column" marginTop={20}>
              <Text>{labels.updated_at}</Text>
              <Text type="secondary">
                {formatDateString(project.updated_at, DATE_FORMAT_LONG)}
              </Text>
            </Flexbox>
          </Col>
          <Col span={12}>
            <Flexbox flexDirection="column">
              <Text>{labels.fuel_total_price}</Text>
              <Text type="secondary">
                {dollarFormatter.format(project.fuel_total_price)}
              </Text>
            </Flexbox>
            <Flexbox flexDirection="column" marginTop={20}>
              <Text>{labels.co2_tax}</Text>
              <Text type="secondary">
                {dollarFormatter.format(project.co2_tax)}
              </Text>
            </Flexbox>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProjectInfo;
