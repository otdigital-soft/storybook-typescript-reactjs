import { Col, Row } from 'antd';
import Box from 'components/Box';
import {
  DetailDateItem,
  DetailItem,
  DetailItemsProvider,
} from 'components/DetailItem';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import { useTheme } from 'styled-components';

const WellReportDescription = () => {
  const { data: wellPlanData, isLoading: isWellPlanDataLoading } =
    useCurrentWellPlan();
  const theme = useTheme();

  return (
    <DetailItemsProvider loading={isWellPlanDataLoading} layout="horizontal">
      <Box padding={24} backgroundColor={theme.colors.sand[3]}>
        <Row gutter={[32, 8]}>
          <>
            <Col span={8}>
              <DetailItem label="Well name" value={wellPlanData?.name.name} />
            </Col>
            <Col span={8}>
              <DetailItem
                label="Well location"
                value={wellPlanData?.location}
              />
            </Col>
            <Col span={8}>
              <DetailItem label="Field" value={wellPlanData?.field} />
            </Col>
          </>
          <>
            <Col span={8}>
              <DetailItem label="Side track" value={wellPlanData?.sidetrack} />
            </Col>
            <Col span={8}>
              <DetailItem label="Well type" value={wellPlanData?.type} />
            </Col>
            <Col span={8} />
          </>
          <>
            <Col span={8}>
              <DetailItem label="Rig name" value={wellPlanData?.asset?.name} />
            </Col>
            <Col span={8}>
              <DetailDateItem
                label="Planned start date"
                value={wellPlanData?.planned_start_date}
              />
            </Col>
            <Col span={8} />
          </>
          <Col span={12}>
            <DetailItem
              label="Description:"
              layout="vertical"
              value={wellPlanData?.description}
              gap={8}
              marginTop={10}
            />
          </Col>
        </Row>
      </Box>
    </DetailItemsProvider>
  );
};

export default WellReportDescription;
