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
import useCustomRigs from 'hooks/useCustomRigs';
import { AddPlaceholder } from 'components/Placeholder';
import Toggle from 'components/Toggle';
import { generateRigDetailsRoute } from './utils';
import { useTagsFilter, TagFilter } from './useTagsFilter';

const Rigs = () => {
  const { activeTag, changeTag, queryFilters } = useTagsFilter();
  const {
    data: rigsData,
    error: rigsError,
    isLoading: isLoadingRigs,
    page,
    changePage,
    ordering,
    changeOrdering,
  } = useCustomRigs({
    initialPage: 1,
    initialPageSize: CARD_LIST_PAGE_SIZE,
    initialOrdering: Ordering.RecentlyAdded,
    ...queryFilters,
  });

  const navigate = useNavigate();
  const onCreateRig = () => {
    navigate(routes.createRig);
  };
  let content;
  if (rigsError) {
    content = <Result status="error" subTitle="Unable to load rigs" />;
  } else if (isLoadingRigs) {
    content = (
      <CardSkeleton
        gutter={[24, 18]}
        span={6}
        numElements={CARD_LIST_PAGE_SIZE}
      />
    );
  } else if (rigsData?.results?.length) {
    content = (
      <>
        <Row gutter={[24, 18]}>
          {rigsData.results.map((rig) => (
            <Col span={6} key={`${rig.type}-${rig.id}`}>
              <ElementCard
                title={rig.name}
                updatedAt={parseISO(rig.updated_at)}
                onClick={() => {
                  navigate(
                    generateRigDetailsRoute(
                      String(rig.id),
                      rig.type.toLowerCase(),
                      rig.project ? String(rig.project.id) : undefined,
                    ),
                  );
                }}
                height="100%"
                tag={
                  <ElementTag
                    createdAt={parseISO(rig.created_at)}
                    draft={rig.draft}
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
            total={rigsData.count}
            onChange={changePage}
            showSizeChanger={false}
          />
        </Flexbox>
      </>
    );
  } else if (rigsData) {
    content = (
      <Row gutter={24}>
        <Col span={6}>
          <AddPlaceholder
            title="Create new rig"
            onClick={onCreateRig}
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
        title={rigsData ? `Rigs (${rigsData.count})` : 'Rigs'}
        subTitle={OrderingLabel[ordering]}
        extra={
          <Flexbox gap={8}>
            <OrderingMenu value={ordering} onChange={changeOrdering} />
            <Button type="primary" onClick={onCreateRig}>
              Create new rig
            </Button>
          </Flexbox>
        }
      />
      <Box marginTop={20}>{content}</Box>
    </>
  );
};

export default Rigs;
