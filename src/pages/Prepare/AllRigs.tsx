import Box, { Flexbox } from 'components/Box';
import { Button, Col, Result, Row } from 'antd';
import PageHeader from 'components/PageHeader';
import { generatePath, useNavigate } from 'react-router-dom';
import { Ordering } from 'utils/ordering';
import ElementCard from 'components/ElementCard';
import parseISO from 'date-fns/parseISO';
import routes from 'routes';
import useCustomRigs from 'hooks/useCustomRigs';
import ElementTag from 'components/ElementTag';
import CardSkeleton from 'components/CardSkeleton';
import { PrepareTab } from './Prepare';
import { AddPlaceholder } from 'components/Placeholder';
import { generateRigDetailsRoute } from './utils';

const AllRigs = () => {
  const navigate = useNavigate();
  const {
    data: rigsData,
    error: rigsError,
    isLoading: isLoadingRigs,
  } = useCustomRigs({
    initialPage: 1,
    initialPageSize: 4,
    initialOrdering: Ordering.RecentlyAdded,
  });
  const onCreateRig = () => {
    navigate(routes.createRig);
  };
  let content = null;
  if (rigsError) {
    content = <Result status="error" subTitle="Unable to load rigs" />;
  } else if (isLoadingRigs) {
    content = <CardSkeleton gutter={24} span={6} numElements={4} />;
  } else if (rigsData?.results?.length) {
    content = (
      <Row gutter={24}>
        {rigsData?.results.map((rig) => (
          <Col span={6} key={`${rig.type}-${rig.id}`}>
            <ElementCard
              title={rig.name}
              onClick={() => {
                navigate(
                  generateRigDetailsRoute(
                    String(rig.id),
                    rig.type.toLowerCase(),
                    rig.project ? String(rig.project.id) : undefined,
                  ),
                );
              }}
              updatedAt={parseISO(rig.updated_at)}
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
      <PageHeader
        pX={0}
        title={rigsData ? `Rigs (${rigsData.count})` : 'Rigs'}
        subTitle="Recently added"
        extra={
          <Flexbox gap={8}>
            <Button
              type="default"
              onClick={() =>
                navigate(
                  generatePath(routes.prepareTab, { tabId: PrepareTab.Rigs }),
                )
              }
            >
              View all rigs
            </Button>
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

export default AllRigs;
