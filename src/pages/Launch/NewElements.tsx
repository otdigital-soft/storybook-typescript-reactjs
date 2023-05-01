import PageHeader from 'components/PageHeader';
import Box, { Flexbox } from 'components/Box';
import { Button, Col, Row } from 'antd';
import { AddPlaceholder, EmptyPlaceholder } from 'components/Placeholder';
import { generatePath, useNavigate } from 'react-router-dom';
import { Ordering, OrderingLabel } from 'utils/ordering';
import OrderingMenu from 'components/OrderingMenu';
import useElements from 'pages/Launch/useElements';
import ElementCard from 'components/ElementCard';
import parseISO from 'date-fns/parseISO';
import { ReactComponent as RigOutlined } from 'assets/icons/RigOutlined.svg';
import { ReactComponent as WellOutlined } from 'assets/icons/WellOutlined.svg';
import { ContentContainer } from './Launch.styled';
import { useTheme } from 'styled-components';
import CardSkeleton from 'components/CardSkeleton';
import routes from 'routes';
import { PrepareTab } from 'pages/Prepare/Prepare';
import { ElementListTypeEnum } from 'api/schema';
import { RigType } from 'routes';
import { generateRigPath, generateWellPath } from 'routes/utils';
import Logger from 'utils/logger';

const NewElements = () => {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const onSeeAllRigs = () => {
    navigate(
      generatePath(routes.prepareTab, {
        tabId: PrepareTab.Rigs,
      }),
    );
  };
  const onSeeAllWells = () => {
    navigate(
      generatePath(routes.prepareTab, {
        tabId: PrepareTab.Wells,
      }),
    );
  };
  const onAddRig = () => {
    navigate(routes.createRig);
  };
  const onAddWell = () => {
    navigate(routes.createWell);
  };
  const {
    data: elementsData,
    error: elementsError,
    isLoading: isLoadingElements,
    ordering,
    changeOrdering,
  } = useElements({
    initialPage: 1,
    initialPageSize: 2,
    initialOrdering: Ordering.RecentlyAdded,
  });

  let content = null;
  if (elementsError) {
    content = <EmptyPlaceholder title="No elements available" padding="28px" />;
  } else if (isLoadingElements) {
    content = <CardSkeleton gutter={71} span={8} numElements={3} />;
  } else if (elementsData?.results?.length) {
    const span = elementsData?.results.length === 1 ? 12 : 6;
    const gutter = elementsData?.results.length === 1 ? 40 : 71;

    content = (
      <Row gutter={gutter}>
        {elementsData?.results.map((element) => (
          <Col span={span} key={`${element.type}-${element.id}`}>
            <ElementCard
              title={element.name}
              height={207}
              description=""
              icon={
                element.type === ElementListTypeEnum.WELL ? (
                  <WellOutlined
                    style={{ color: colors.green[13], width: 32, height: 32 }}
                  />
                ) : element.type === ElementListTypeEnum.JACKUP_RIG ? (
                  <RigOutlined style={{ color: colors.green[13] }} />
                ) : element.type === ElementListTypeEnum.SEMI_RIG ? (
                  <RigOutlined style={{ color: colors.green[13] }} />
                ) : element.type === ElementListTypeEnum.DRILLSHIP ? (
                  <RigOutlined style={{ color: colors.green[13] }} />
                ) : undefined
              }
              cardColor={colors.green[13]}
              onClick={() => {
                if (element.type === ElementListTypeEnum.WELL) {
                  return navigate(
                    generateWellPath(element.id, element.project),
                  );
                } else if (element.type === ElementListTypeEnum.JACKUP_RIG) {
                  return navigate(
                    generateRigPath(
                      element.id,
                      RigType.Jackup,
                      element.project,
                    ),
                  );
                } else if (element.type === ElementListTypeEnum.SEMI_RIG) {
                  return navigate(
                    generateRigPath(element.id, RigType.Semi, element.project),
                  );
                } else if (element.type === ElementListTypeEnum.DRILLSHIP) {
                  return navigate(
                    generateRigPath(
                      element.id,
                      RigType.Drillship,
                      element.project,
                    ),
                  );
                }
                Logger.error(`Clicked unknown element type: ${element.type}`);
              }}
              updatedAt={parseISO(element.updated_at)}
            />
          </Col>
        ))}
        <Col lg={6} span={span}>
          <AddPlaceholder
            title="Create new rig"
            onClick={onAddRig}
            flexGrow={1}
            height="100%"
            maxWidth={400}
          />
        </Col>
        <Col lg={6} span={span}>
          <AddPlaceholder
            title="Create new well"
            onClick={onAddWell}
            flexGrow={1}
            height="100%"
            maxWidth={400}
          />
        </Col>
      </Row>
    );
  } else if (elementsData) {
    content = (
      <Flexbox gap="42px">
        <AddPlaceholder
          title="Create new rig"
          height="209px"
          flexGrow={1}
          onClick={onAddRig}
          maxWidth={400}
        />

        <AddPlaceholder
          title="Create new well"
          height="209px"
          flexGrow={1}
          onClick={onAddWell}
          maxWidth={400}
        />
      </Flexbox>
    );
  }

  return (
    <Box marginTop={15}>
      <PageHeader
        title="Elements"
        subTitle={OrderingLabel[ordering]}
        extra={
          <Flexbox gap="8px">
            <OrderingMenu value={ordering} onChange={changeOrdering} />
            <Button type="primary" onClick={onSeeAllRigs}>
              View all rigs
            </Button>
            <Button type="primary" onClick={onSeeAllWells}>
              View all wells
            </Button>
          </Flexbox>
        }
      />
      <ContentContainer>{content}</ContentContainer>
    </Box>
  );
};

export default NewElements;
