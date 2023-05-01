import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import { useMemo } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import { reorderDraggableMap } from 'utils/reorder';
import { Col, Empty, Row } from 'antd';
import { Flexbox } from 'components/Box';
import { Text, Title } from 'components/Typography';
import { FormElementValues, FormValues } from './EMPBaseForm';
import DroppableList from 'components/DroppableList';
import AddedElement from 'containers/EMPForm/AddedElement';
import AvailableElement from 'containers/EMPForm/AvailableElement';

const resetElement = (element: FormElementValues): FormElementValues => {
  return {
    ...element,
    id: null,
    baseline_average: '',
    target_average: '',
  };
};

const EMPElements = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const totalPercentageImprovements = useMemo(() => {
    return values.addedElements
      .map((element) => element.percentage_improvement)
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue;
      }, 0);
  }, [values.addedElements]);

  const onAddElement = (
    element: FormElementValues,
    elementIndex: number,
    availableElementsArrayHelpers: FieldArrayRenderProps,
    addedElementsArrayHelpers: FieldArrayRenderProps,
  ) => {
    availableElementsArrayHelpers.remove(elementIndex);
    addedElementsArrayHelpers.push(element);
  };

  const onRemoveElement = (
    elementIndex: number,
    element: FormElementValues,
    availableElementsArrayHelpers: FieldArrayRenderProps,
    addedElementsArrayHelpers: FieldArrayRenderProps,
  ) => {
    addedElementsArrayHelpers.remove(elementIndex);
    availableElementsArrayHelpers.push(resetElement(element));
  };

  const onDragEnd = (result: DropResult) => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const reordered = reorderDraggableMap({
      draggableMap: {
        availableElements: values.availableElements,
        addedElements: values.addedElements,
      },
      source: result.source,
      destination: result.destination,
    });
    setFieldValue(
      'availableElements',
      reordered.availableElements.map((element) => resetElement(element)),
    );
    setFieldValue('addedElements', reordered.addedElements);
  };

  return (
    <FieldArray
      name="availableElements"
      render={(availableElementsArrayHelpers) => (
        <FieldArray
          name="addedElements"
          render={(addedElementsArrayHelpers) => (
            <DragDropContext onDragEnd={onDragEnd}>
              <Row gutter={35}>
                <Col span={12}>
                  <Flexbox flexDirection="column">
                    <Text type="secondary" strong>
                      Available elements:
                    </Text>
                    <Text>Drag & drop</Text>
                  </Flexbox>
                  <Flexbox marginTop={20} flexDirection="column">
                    <Droppable droppableId="availableElements" type="element">
                      {(droppableProvided, snapshot) => (
                        <DroppableList
                          isDraggingOver={snapshot.isDraggingOver}
                          ref={droppableProvided.innerRef}
                          {...droppableProvided.droppableProps}
                        >
                          {values.availableElements.map((element, index) => (
                            <Draggable
                              key={element.concept_id}
                              draggableId={String(element.concept_id)}
                              index={index}
                            >
                              {(draggableProvided) => (
                                <AvailableElement
                                  ref={draggableProvided.innerRef}
                                  draggableProps={
                                    draggableProvided.draggableProps
                                  }
                                  dragHandleProps={
                                    draggableProvided.dragHandleProps
                                  }
                                  element={element}
                                  onAdd={() =>
                                    onAddElement(
                                      element,
                                      index,
                                      availableElementsArrayHelpers,
                                      addedElementsArrayHelpers,
                                    )
                                  }
                                />
                              )}
                            </Draggable>
                          ))}
                          {!values.availableElements.length ? (
                            <Empty
                              description="No element available."
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                          ) : null}
                          {droppableProvided.placeholder}
                        </DroppableList>
                      )}
                    </Droppable>
                  </Flexbox>
                </Col>
                <Col span={12}>
                  <Flexbox justifyContent="space-between">
                    <Flexbox flexDirection="column">
                      <Text type="secondary" strong>
                        EMP Elements
                      </Text>
                      <Text>Selected elements</Text>
                    </Flexbox>
                    {values.addedElements.length ? (
                      <Flexbox marginTop={-10}>
                        <Flexbox alignItems="center" marginX={24}>
                          <Title level={5} type="secondary">
                            CO2 Improvement result
                          </Title>
                        </Flexbox>
                        <Flexbox
                          backgroundColor="lime.7"
                          height={54}
                          maxWidth={250}
                          paddingX={24}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Title
                            level={3}
                            color="white"
                            ellipsis
                          >{`${totalPercentageImprovements}%`}</Title>
                        </Flexbox>
                      </Flexbox>
                    ) : null}
                  </Flexbox>
                  <Flexbox marginTop={20} flexDirection="column">
                    <Droppable droppableId="addedElements" type="element">
                      {(droppableProvided, droppableSnapshot) => (
                        <DroppableList
                          ref={droppableProvided.innerRef}
                          {...droppableProvided.droppableProps}
                          isDraggingOver={droppableSnapshot.isDraggingOver}
                        >
                          {values.addedElements.map((element, index) => (
                            <Draggable
                              key={element.concept_id}
                              draggableId={String(element.concept_id)}
                              index={index}
                            >
                              {(draggableProvided) => (
                                <AddedElement
                                  ref={draggableProvided.innerRef}
                                  draggableProps={
                                    draggableProvided.draggableProps
                                  }
                                  dragHandleProps={
                                    draggableProvided.dragHandleProps
                                  }
                                  element={element}
                                  index={index}
                                  onRemove={() =>
                                    onRemoveElement(
                                      index,
                                      element,
                                      availableElementsArrayHelpers,
                                      addedElementsArrayHelpers,
                                    )
                                  }
                                />
                              )}
                            </Draggable>
                          ))}
                          {!values?.addedElements.length ? (
                            <Empty
                              description="No element selected."
                              image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                          ) : null}
                          {droppableProvided.placeholder}
                        </DroppableList>
                      )}
                    </Droppable>
                  </Flexbox>
                </Col>
              </Row>
            </DragDropContext>
          )}
        />
      )}
    />
  );
};

export default EMPElements;
