import { Col, Row } from 'antd';
import { AddPlaceholder } from 'components/Placeholder';
import StudyChartCard from 'pages/Study/StudyChartCard';
import { useLayoutSwitch } from 'components/LayoutSwitch';
import { Gutter } from 'antd/lib/grid/row';
import { LayoutType } from 'components/LayoutSwitch/LayoutSwitchProvider';
import { useMemo } from 'react';
import StudyElementModal from 'pages/Study/StudyElementModal';
import { useParams } from 'react-router-dom';
import useCreateStudyElement from 'pages/Study/useCreateStudyElement';
import { StudyElementList } from 'api/schema';

interface StudyChartsProps {
  elements: StudyElementList[];
}

const StudyCharts = ({ elements }: StudyChartsProps) => {
  const { layoutType } = useLayoutSwitch();
  const { rowGutter, colSpan, addChartHeight } = useMemo((): {
    colSpan: number;
    rowGutter: Gutter | [Gutter, Gutter];
    addChartHeight: number | string;
  } => {
    if (layoutType === LayoutType.List) {
      return {
        rowGutter: [0, 50],
        colSpan: 24,
        addChartHeight: 157,
      };
    }
    if (layoutType == LayoutType.Card) {
      return {
        rowGutter: [34, 50],
        colSpan: 12,
        addChartHeight: 547,
      };
    }
    throw new Error(`${layoutType} is unknown layout type`);
  }, [layoutType]);
  const { projectId } = useParams<{ projectId: string }>();
  const {
    schema,
    initialValues,
    onCreateStudyElement,
    isModalVisible,
    setIsModalVisible,
  } = useCreateStudyElement(Number(projectId));

  return (
    <>
      <Row gutter={rowGutter}>
        {elements.map((element, index) => (
          <Col span={colSpan} key={element.id}>
            <StudyChartCard
              elementListItem={element}
              prevElement={elements[index - 1]}
              nextElement={elements[index + 1]}
            />
          </Col>
        ))}
        <Col span={colSpan}>
          <AddPlaceholder
            title="Add chart"
            height={addChartHeight}
            onClick={() => setIsModalVisible(true)}
          />
        </Col>
      </Row>
      <StudyElementModal
        onSubmit={(values, formikHelpers) => {
          return onCreateStudyElement({ values, formikHelpers });
        }}
        initialValues={initialValues}
        schema={schema}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        title="Add chart"
      />
    </>
  );
};

export default StudyCharts;
