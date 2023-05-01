import { Col } from 'antd';
import Box from 'components/Box';
import DraggableCard from 'components/DraggableCard';
import { Row } from 'components/Grid';
import { Text } from 'components/Typography';
import { FormElementValues } from 'containers/EMPForm/EMPBaseForm';
import { forwardRef } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

interface AvailableElementProps {
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  element: FormElementValues;
  onAdd: () => void;
}

const AvailableElement = forwardRef<HTMLDivElement, AvailableElementProps>(
  ({ draggableProps, dragHandleProps, element, onAdd }, ref) => {
    return (
      <DraggableCard
        ref={ref}
        draggableProps={draggableProps}
        dragHandleProps={dragHandleProps}
        title="Element"
        elementName="element"
        onAdd={onAdd}
      >
        <Row gutter={28} flexGrow={1}>
          <Col span={12}>
            <Text fontSize={10} type="secondary">
              Name
            </Text>
            <Box>{element.name}</Box>
          </Col>
          <Col span={12}>
            <Text fontSize={10} type="secondary">
              Sub area
            </Text>
            <Box>{element.subarea}</Box>
          </Col>
        </Row>
      </DraggableCard>
    );
  },
);

export default AvailableElement;
