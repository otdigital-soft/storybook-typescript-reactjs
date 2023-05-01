import PageHeader from 'components/PageHeader';
import { Ordering, OrderingLabel } from 'utils/ordering';
import Box, { Flexbox } from 'components/Box';
import { Button, Col, Pagination, Result, Row } from 'antd';
import ElementCard from 'components/ElementCard';
import parseISO from 'date-fns/parseISO';
import OrderingMenu from 'components/OrderingMenu';
import { useNavigate } from 'react-router-dom';
import CardSkeleton from 'components/CardSkeleton';
import { CARD_LIST_PAGE_SIZE } from 'consts';
import ElementTag from 'components/ElementTag';
import routes from 'routes';
import useCustomWells from 'hooks/useCustomWells';
import { AddPlaceholder } from 'components/Placeholder';
import { generateWellPath } from 'routes/utils';
import Toggle from '../../components/Toggle';
import { TagFilter, useTagsFilter } from './useTagsFilter';

const Wells = () => {
  const { activeTag, changeTag, queryFilters } = useTagsFilter();
  const {
    data: wellsData,
    error: wellsError,
    isLoading: isLoadingWells,
    page,
    changePage,
    ordering,
    changeOrdering,
  } = useCustomWells({
    initialPage: 1,
    initialPageSize: CARD_LIST_PAGE_SIZE,
    initialOrdering: Ordering.RecentlyAdded,
    ...queryFilters,
  });
  const navigate = useNavigate();
  const onCreateWell = () => {
    navigate(routes.createWell);
  };

  let content;
  if (wellsError) {
    content = <Result status="error" subTitle="Unable to load wells" />;
  } else if (isLoadingWells) {
    content = (
      <CardSkeleton
        gutter={[24, 18]}
        span={6}
        numElements={CARD_LIST_PAGE_SIZE}
      />
    );
  } else if (wellsData?.results?.length) {
    content = (
      <>
        <Row gutter={[24, 18]}>
          {wellsData.results.map((well) => (
            <Col span={6} key={well.id}>
              <ElementCard
                title={well.name}
                updatedAt={parseISO(well.updated_at)}
                onClick={() =>
                  navigate(generateWellPath(well.id, well.project?.id))
                }
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
        <Flexbox marginTop={41} justifyContent="flex-end">
          <Pagination
            current={page}
            pageSize={CARD_LIST_PAGE_SIZE}
            hideOnSinglePage
            total={wellsData.count}
            onChange={changePage}
            showSizeChanger={false}
          />
        </Flexbox>
      </>
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
      <Box marginBottom={12}>
        <Toggle
          onClick={() => {
            changeTag(TagFilter.latest);
            changePage(1);
          }}
          selected={activeTag === TagFilter.latest}
        >
          <strong>Latest</strong>
        </Toggle>

        <Toggle
          onClick={() => {
            changeTag(TagFilter.draft);
            changePage(1);
          }}
          selected={activeTag === TagFilter.draft}
        >
          <strong>In progress</strong>
        </Toggle>

        <Toggle
          onClick={() => {
            changeTag(TagFilter.completed);
            changePage(1);
          }}
          selected={activeTag === TagFilter.completed}
        >
          <strong>Completed</strong>
        </Toggle>
      </Box>

      <PageHeader
        pX={0}
        title={wellsData ? `Wells (${wellsData.count})` : 'Wells'}
        subTitle={OrderingLabel[ordering]}
        extra={
          <Flexbox gap={8}>
            <OrderingMenu value={ordering} onChange={changeOrdering} />
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

export default Wells;
