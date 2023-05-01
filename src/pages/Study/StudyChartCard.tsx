import {
  CloseCircleOutlined,
  DownCircleOutlined,
  UpCircleOutlined,
} from '@ant-design/icons';
import { Text } from 'components/Typography';
import Box, { Flexbox } from 'components/Box';
import { Button, Spin } from 'antd';
import BarChart from 'pages/Study/BarChart';
import { Card, CardBody } from 'components/ElementCard/ElementCard.styled';
import { ChartCardHeader } from 'pages/Study/StudyChartCard.styled';
import useDeleteStudyElement from 'pages/Study/useDeleteStudyElement';
import { useParams } from 'react-router-dom';
import StudyElementModal from 'pages/Study/StudyElementModal';
import useUpdateStudyElement from 'pages/Study/useUpdateStudyElement';
import useSwapStudyElements from './useSwapStudyElements';
import useStudyReport from 'pages/Study/useStudyReport';
import { StudyElementList } from 'api/schema';
import useShortPollStudyElement from './useShortPollStudyElement';
import Result from 'components/Result';
import Center from 'components/Center';

interface StudyChartCardProps {
  elementListItem: StudyElementList;
  prevElement?: StudyElementList;
  nextElement?: StudyElementList;
}

const StudyChartCard = ({
  elementListItem,
  prevElement,
  nextElement,
}: StudyChartCardProps) => {
  const { projectId } = useParams<{ projectId: string }>();
  const {
    data: elementData,
    isLoading: isElementDataLoading,
    isRefetching: isElementDataIdle,
  } = useShortPollStudyElement(Number(projectId), elementListItem.id);
  const {
    schema,
    initialValues,
    onUpdateStudyElement,
    isModalVisible,
    setIsModalVisible,
  } = useUpdateStudyElement(Number(projectId), elementData);
  const { canMoveUp, onMoveUp, onMoveDown, canMoveDown } = useSwapStudyElements(
    {
      projectId: Number(projectId),
      element: elementListItem,
      prevElement,
      nextElement,
    },
  );
  const onDeleteStudyElement = useDeleteStudyElement(
    Number(projectId),
    elementListItem,
  );
  const { setChartRef } = useStudyReport();

  if (!isElementDataLoading && !elementData) {
    return <Result status="error" subTitle="Unable to load chart data" />;
  }

  return (
    <>
      <Card>
        <ChartCardHeader gap={8} alignItems="flex-start">
          <Flexbox flexDirection="column" gap={14}>
            <Text
              fontSize={32}
              lineHeight={1}
              color={canMoveUp ? 'gray.7' : 'gray.5'}
              onClick={canMoveUp ? onMoveUp : undefined}
              title="Move up"
              cursor={canMoveUp ? 'pointer' : 'not-allowed'}
            >
              <UpCircleOutlined />
            </Text>
            <Text
              fontSize={32}
              lineHeight={1}
              color={canMoveDown ? 'gray.7' : 'gray.5'}
              onClick={canMoveDown ? onMoveDown : undefined}
              title="Move down"
              cursor={canMoveDown ? 'pointer' : 'not-allowed'}
            >
              <DownCircleOutlined />
            </Text>
          </Flexbox>
          <Box flexGrow={1} marginLeft={20}>
            <Text fontSize={18} lineHeight="32px">
              <strong>{elementListItem.title}</strong>
            </Text>
          </Box>
          <Flexbox gap={8} alignItems="center">
            <Text
              fontSize={24}
              lineHeight={0}
              color="red.5"
              cursor="pointer"
              title="Remove chart"
              onClick={onDeleteStudyElement}
            >
              <CloseCircleOutlined />
            </Text>
            <Button type="primary" onClick={() => setIsModalVisible(true)}>
              Edit
            </Button>
          </Flexbox>
        </ChartCardHeader>
        <CardBody>
          <Flexbox justifyContent="center" height={402} width="100%">
            {isElementDataLoading ? (
              <Center>
                <Spin />
              </Center>
            ) : isElementDataIdle ? (
              <Center>
                <Spin tip="Calculating..." />
              </Center>
            ) : elementData ? (
              <BarChart
                metric={
                  elementData.metric.unit
                    ? `${elementData.metric.name} (${elementData.metric.unit})`
                    : elementData.metric.name
                }
                metricUnit={elementData.metric.unit}
                labels={elementData.rigs.map((rig) => rig.name)}
                values={elementData.rigs.map((rig) => rig.value || 0)}
                ref={setChartRef(String(elementData.id))}
                precision={2}
              />
            ) : null}
          </Flexbox>
        </CardBody>
      </Card>
      <StudyElementModal
        onSubmit={(values, formikHelpers) => {
          return onUpdateStudyElement({ values, formikHelpers });
        }}
        initialValues={initialValues}
        schema={schema}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        title="Edit chart"
      />
    </>
  );
};

export default StudyChartCard;
