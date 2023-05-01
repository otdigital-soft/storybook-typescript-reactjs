import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import { Col, Empty, Row } from 'antd';
import { Flexbox } from 'components/Box';
import { Text, Title } from 'components/Typography';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd';
import AvailableWell from 'containers/PlanForm/AvailableWell';
import AddedWell from 'containers/PlanForm/AddedWell';
import { FormValues, FormWellValues } from './form';
import { reorderDraggableMap } from 'utils/reorder';
import { useEffect, useState } from 'react';
import DroppableList from 'components/DroppableList';
import { resetWellValues } from './utils';

const PlanWells = () => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const [totalDistance, setTotalDistance] = useState(0);
  useEffect(() => {
    const calculatedDistance = values.addedWells
      .map((well) => well.distance_from_previous_location)
      .filter((distance) => distance !== '')
      .reduce((previousValue, currentValue) => {
        if (
          typeof previousValue === 'number' &&
          typeof currentValue === 'number'
        ) {
          return previousValue + currentValue;
        }
        return previousValue;
      }, 0);
    setTotalDistance(calculatedDistance as number);
  }, [values.addedWells]);

  const onAddWell = (
    well: FormWellValues,
    wellIndex: number,
    availableWellsArrayHelpers: FieldArrayRenderProps,
    addedWellsArrayHelpers: FieldArrayRenderProps,
  ) => {
    availableWellsArrayHelpers.remove(wellIndex);
    addedWellsArrayHelpers.push(well);
  };

  const onRemoveWell = (
    wellIndex: number,
    well: FormWellValues,
    availableWellsArrayHelpers: FieldArrayRenderProps,
    addedWellsArrayHelpers: FieldArrayRenderProps,
  ) => {
    addedWellsArrayHelpers.remove(wellIndex);
    availableWellsArrayHelpers.push(resetWellValues(well));
  };

  const onDragEnd = (result: DropResult) => {
    // dropped nowhere
    if (!result.destination) {
      return;
    }

    const reordered = reorderDraggableMap({
      draggableMap: {
        availableWells: values.availableWells,
        addedWells: values.addedWells,
      },
      source: result.source,
      destination: result.destination,
    });
    setFieldValue(
      'availableWells',
      reordered.availableWells.map((well) => resetWellValues(well)),
    );
    setFieldValue('addedWells', reordered.addedWells);
  };

  return (
    <FieldArray
      name="availableWells"
      render={(availableWellsArrayHelpers) => (
        <FieldArray
          name="addedWells"
          render={(addedWellsArrayHelpers) => (
            <DragDropContext onDragEnd={onDragEnd}>
              <Row gutter={33}>
                <Col span={12}>
                  <Flexbox flexDirection="column">
                    <Text type="secondary" strong>
                      Available wells:
                    </Text>
                    <Text>Drag & drop</Text>
                  </Flexbox>
                  <Flexbox marginTop={20} flexDirection="column">
                    <Droppable droppableId="availableWells" type="well">
                      {(droppableProvided, snapshot) => (
                        <DroppableList
                          isDraggingOver={snapshot.isDraggingOver}
                          ref={droppableProvided.innerRef}
                          {...droppableProvided.droppableProps}
                        >
                          {values.availableWells.map((well, index) => (
                            <Draggable
                              key={well.id}
                              draggableId={String(well.id)}
                              index={index}
                            >
                              {(draggableProvided) => (
                                <AvailableWell
                                  ref={draggableProvided.innerRef}
                                  draggableProps={
                                    draggableProvided.draggableProps
                                  }
                                  dragHandleProps={
                                    draggableProvided.dragHandleProps
                                  }
                                  well={well}
                                  onAdd={() =>
                                    onAddWell(
                                      well,
                                      index,
                                      availableWellsArrayHelpers,
                                      addedWellsArrayHelpers,
                                    )
                                  }
                                />
                              )}
                            </Draggable>
                          ))}
                          {!values.availableWells.length ? (
                            <Empty
                              description="No well available."
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
                        Plan creator:
                      </Text>
                      <Text>Selected wells and distances</Text>
                    </Flexbox>
                    {totalDistance ? (
                      <Flexbox marginTop={-10}>
                        <Flexbox alignItems="center" marginX={24}>
                          <Title level={5} type="secondary">
                            Distance summary
                          </Title>
                        </Flexbox>
                        <Flexbox
                          backgroundColor="gray.3"
                          height={54}
                          maxWidth={250}
                          paddingX={24}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Title
                            level={3}
                            ellipsis
                          >{`${totalDistance}nm`}</Title>
                        </Flexbox>
                      </Flexbox>
                    ) : null}
                  </Flexbox>
                  <Flexbox marginTop={20} flexDirection="column">
                    <Droppable droppableId="addedWells" type="well">
                      {(droppableProvided, droppableSnapshot) => (
                        <DroppableList
                          ref={droppableProvided.innerRef}
                          {...droppableProvided.droppableProps}
                          isDraggingOver={droppableSnapshot.isDraggingOver}
                        >
                          {values.addedWells.map((well, index) => (
                            <Draggable
                              key={well.id}
                              draggableId={String(well.id)}
                              index={index}
                            >
                              {(draggableProvided, draggableSnapshot) => (
                                <AddedWell
                                  ref={draggableProvided.innerRef}
                                  draggableProps={
                                    draggableProvided.draggableProps
                                  }
                                  dragHandleProps={
                                    draggableProvided.dragHandleProps
                                  }
                                  key={well.id}
                                  name={`addedWells.${index}`}
                                  isFirst={
                                    !index || draggableSnapshot.isDragging
                                  }
                                  isLast={
                                    index + 1 === values.addedWells.length ||
                                    draggableSnapshot.isDragging
                                  }
                                  onRemove={() =>
                                    onRemoveWell(
                                      index,
                                      well,
                                      availableWellsArrayHelpers,
                                      addedWellsArrayHelpers,
                                    )
                                  }
                                />
                              )}
                            </Draggable>
                          ))}
                          {!values?.addedWells.length ? (
                            <Empty
                              description="No well selected."
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

export default PlanWells;
