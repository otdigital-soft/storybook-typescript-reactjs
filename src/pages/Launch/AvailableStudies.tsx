import { BarChartOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import Box, { Flexbox } from 'components/Box';
import CardSkeleton from 'components/CardSkeleton';
import ElementCard from 'components/ElementCard';
import OrderingMenu from 'components/OrderingMenu';
import PageHeader from 'components/PageHeader';
import { EmptyPlaceholder } from 'components/Placeholder';
import parseISO from 'date-fns/parseISO';
import useProjects from 'hooks/useProjects';
import {
  ContentContainer,
  Separator,
  SeparatorContainer,
} from 'pages/Launch/Launch.styled';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import { useTheme } from 'styled-components';
import { Ordering, OrderingLabel } from 'utils/ordering';

const AvailableStudies = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const onSeeAll = () => {
    navigate(routes.studies);
  };
  const {
    data: studiesData,
    error: studiesError,
    isLoading: isLoadingStudies,
    ordering,
    changeOrdering,
  } = useProjects({
    initialPage: 1,
    initialPageSize: 3,
    initialOrdering: Ordering.RecentlyAdded,
  });
  let content = null;
  if (studiesError) {
    content = (
      <EmptyPlaceholder title="Unable to load benchmarks" padding="28px" />
    );
  } else if (isLoadingStudies) {
    content = <CardSkeleton gutter={71} span={8} numElements={3} />;
  } else if (studiesData?.results?.length) {
    const span = studiesData?.results.length === 1 ? 12 : 8;
    const gutter = studiesData?.results.length === 1 ? 40 : 71;

    content = (
      <Row gutter={gutter}>
        {studiesData?.results.map((study) => (
          <Col span={span} key={study.id}>
            <ElementCard
              title={study.name}
              cardColor={colors.magenta[8]}
              description={study.description}
              icon={<BarChartOutlined style={{ color: colors.magenta[8] }} />}
              onClick={() =>
                navigate(
                  generatePath(routes.study, { projectId: String(study.id) }),
                )
              }
              updatedAt={parseISO(study.updated_at)}
              height="100%"
              ellipsis={{
                rows: 3,
              }}
            />
          </Col>
        ))}
      </Row>
    );
  } else if (studiesData) {
    content = (
      <EmptyPlaceholder
        title="Currently, there are no benchmarks available"
        padding="28px"
      />
    );
  }

  return (
    <Box marginTop={15}>
      <PageHeader
        title="Benchmarks"
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

export default AvailableStudies;
