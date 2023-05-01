import Box, { Flexbox } from 'components/Box';
import { Button, Col, Result, Row } from 'antd';
import PageHeader from 'components/PageHeader';
import { generatePath, useNavigate } from 'react-router-dom';
import { Ordering } from 'utils/ordering';
import ElementCard from 'components/ElementCard';
import parseISO from 'date-fns/parseISO';
import routes from 'routes';
import useCustomWells from 'hooks/useCustomWells';
import ElementTag from 'components/ElementTag';
import CardSkeleton from 'components/CardSkeleton';
import { PrepareTab } from './Prepare';
import { AddPlaceholder } from 'components/Placeholder';
import { generateWellPath } from 'routes/utils';

const AllWells = () => {
  const navigate = useNavigate();
  const {
    data: wellsData,
    error: wellsError,
    isLoading: isLoadingWells,
  } = useCustomWells({
    initialPage: 1,
    initialPageSize: 4,
    initialOrdering: Ordering.RecentlyAdded,
  });
  const onCreateWell = () => {
    navigate(routes.createWell);
  };
  let content = null;
  if (wellsError) {
    content = <Result status="error" subTitle="Unable to load wells" />;
  } else if (isLoadingWells) {
    content = <CardSkeleton gutter={24} span={6} numElements={4} />;
  } else if (wellsData?.results?.length) {
    content = (
      <Row gutter={24}>
        {wellsData?.results.map((well) => (
          <Col span={6} key={well.id}>
            <ElementCard
              title={well.name}
              onClick={() => {
                navigate(generateWellPath(well.id, well.project?.id));
              }}
              updatedAt={parseISO(well.updated_at)}
              height="100%"
              tag={
                <ElementTag
                  createdAt={parseISO(well.created_at)}
                  draft={well.draft}
                />
              }
            />
          </Col>
        ))}
      </Row>
    );
  } else if (wellsData) {
    content = (
      <Row gutter={24}>
        <Col span={6}>
          <AddPlaceholder
            title="Create new well"
            onClick={onCreateWell}
            height={209}
          />
        </Col>
      </Row>
    );
  }
  return (
    <>
      <PageHeader
        pX={0}
        title={wellsData ? `Wells (${wellsData.count})` : 'Wells'}
        subTitle="Recently added"
        extra={
          <Flexbox gap={8}>
            <Button
              type="default"
              onClick={() =>
                navigate(
                  generatePath(routes.prepareTab, { tabId: PrepareTab.Wells }),
                )
              }
            >
              View all wells
            </Button>
            <Button type="primary" onClick={onCreateWell}>
              Create new well
            </Button>
          </Flexbox>
        }
      />
      <Box marginTop={20}>{content}</Box>
    </>
  );
};

export default AllWells;
