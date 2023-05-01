import { Col } from 'antd';
import { CustomRigList, PlanList, ProjectDetails } from 'api/schema';
import Box, { Flexbox } from 'components/Box';
import { Row } from 'components/Grid';
import { Text, Title } from 'components/Typography';
import { DATE_FORMAT_LONG } from 'consts';
import { PROJECT_LABELS as labels } from 'consts/projects';
import { formatDateString } from 'utils/date';

interface ProjectInfoProps {
  project: ProjectDetails;
  rigs: CustomRigList[];
  plans: PlanList[];
}

const ProjectInfo = ({ project, rigs, plans }: ProjectInfoProps) => {
  return (
    <>
      <Flexbox gap={20}>
        <Box flexGrow={1}>
          <Title level={5} type="secondary">
            Description
          </Title>
          <Box marginTop={20}>
            <Text type="secondary">{project.description}</Text>
          </Box>
        </Box>
        <Box flexShrink={0}>
          <Text>{labels.created_at}</Text>
          <Box>
            <Text type="secondary">
              {formatDateString(project.created_at, DATE_FORMAT_LONG)}
            </Text>
          </Box>
          <Box marginTop={20}>
            <Text>{labels.updated_at}</Text>
            <Box>
              <Text type="secondary">
                {formatDateString(project.updated_at, DATE_FORMAT_LONG)}
              </Text>
            </Box>
          </Box>
        </Box>
      </Flexbox>
      <Row gutter={20} marginTop={20}>
        <Col span={6}>
          <Title level={5} type="secondary">
            Rigs
          </Title>
          <Box marginTop={16}>
            {rigs.length ? (
              <>
                {rigs.map((rig, index) => (
                  <Box key={`${rig.type}-${rig.id}`} marginTop={index ? 10 : 0}>
                    <Text type="secondary">{rig.name}</Text>
                  </Box>
                ))}
              </>
            ) : (
              <Text type="secondary">No rig available</Text>
            )}
          </Box>
        </Col>
        <Col span={6}>
          <Title level={5} type="secondary">
            Plans
          </Title>
          <Box marginTop={16}>
            {plans.length ? (
              <>
                {plans.map((plan, index) => (
                  <Box key={plan.id} marginTop={index ? 10 : 0}>
                    <Text type="secondary">
                      {plan.name}{' '}
                      {plan.wells.length
                        ? `(${plan.wells.map((well) => well.name).join(', ')})`
                        : ''}
                    </Text>
                  </Box>
                ))}
              </>
            ) : (
              <Text type="secondary">No plan available</Text>
            )}
          </Box>
        </Col>
      </Row>
    </>
  );
};

export default ProjectInfo;
