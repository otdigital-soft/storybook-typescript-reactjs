import { FundProjectionScreenOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import Box, { Flexbox } from 'components/Box';
import CardSkeleton from 'components/CardSkeleton';
import ElementCard from 'components/ElementCard';
import OrderingMenu from 'components/OrderingMenu';
import PageHeader from 'components/PageHeader';
import { EmptyPlaceholder } from 'components/Placeholder';
import parseISO from 'date-fns/parseISO';
import useMonitors from 'hooks/useMonitors';
import {
  ContentContainer,
  Separator,
  SeparatorContainer,
} from 'pages/Launch/Launch.styled';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { Ordering, OrderingLabel } from 'utils/ordering';

const AvailableMonitors = () => {
  const navigate = useNavigate();
  const onSeeAll = () => {
    navigate(routes.monitors);
  };
  const {
    data: monitorsData,
    error: monitorsError,
    isLoading: isLoadingMonitors,
    ordering,
    changeOrdering,
  } = useMonitors({
    initialPage: 1,
    initialPageSize: 2,
    initialOrdering: Ordering.RecentlyAdded,
  });
  let content = null;
  if (monitorsError) {
    content = (
      <EmptyPlaceholder title="Unable to load monitors" padding="28px" />
    );
  } else if (isLoadingMonitors) {
    content = <CardSkeleton gutter={40} span={12} numElements={2} />;
  } else if (monitorsData?.results?.length) {
    content = (
      <Row gutter={40}>
        {monitorsData?.results.map((monitor) => (
          <Col span={12} key={monitor.id}>
            <ElementCard
              title={monitor.name}
              description={monitor.description}
              icon={<FundProjectionScreenOutlined />}
              onClick={() =>
                navigate(
                  generatePath(routes.monitor, {
                    monitorId: String(monitor.id),
                  }),
                )
              }
              updatedAt={parseISO(monitor.updated_at)}
              height="100%"
              ellipsis={{
                rows: 3,
              }}
            />
          </Col>
        ))}
      </Row>
    );
  } else if (monitorsData) {
    content = (
      <EmptyPlaceholder
        title="Currently, there are no monitors available"
        padding="28px"
      />
    );
  }

  return (
    <Box marginTop={20}>
      <PageHeader
        title="Monitors"
        subTitle={OrderingLabel[ordering]}
        extra={
          <Flexbox gap="8px">
            <OrderingMenu value={ordering} onChange={changeOrdering} />
            <Button type="primary" onClick={onSeeAll}>
              View all
            </Button>
          </Flexbox>
        }
      />
      <ContentContainer>{content}</ContentContainer>
      <SeparatorContainer>
        <Separator />
      </SeparatorContainer>
    </Box>
  );
};

export default AvailableMonitors;
