import { Col } from 'antd';
import Box from 'components/Box';
import DraggableCard from 'components/DraggableCard';
import { Row } from 'components/Grid';
import { Text } from 'components/Typography';
import { ElementInput } from 'containers/EMPForm/AddedElement.styled';
import { FormElementValues, labels } from 'containers/EMPForm/EMPBaseForm';
import { forwardRef } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { toLowerCaseFirstLetter } from 'utils/format';

interface AddedElementProps {
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  onRemove: () => void;
  element: FormElementValues;
  index: number;
}

const AddedElement = forwardRef<HTMLDivElement, AddedElementProps>(
  ({ draggableProps, dragHandleProps, onRemove, element, index }, ref) => {
    return (
      <DraggableCard
        ref={ref}
        draggableProps={draggableProps}
        dragHandleProps={dragHandleProps}
        title="Element"
        elementName="element"
        onRemove={onRemove}
      >
        <Row gutter={[28, 25]} flexGrow={1}>
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
          <Col span={12}>
            <ElementInput
              name={`addedElements.${index}.baseline_average`}
              formItemProps={{
                label: labels.baseline_average,
              }}
              inputNumberProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(
                  labels.baseline_average,
                )}`,
              }}
            />
          </Col>
          <Col span={12}>
            <ElementInput
              name={`addedElements.${index}.target_average`}
              formItemProps={{
                label: labels.target_average,
              }}
              inputNumberProps={{
                placeholder: `Enter ${toLowerCaseFirstLetter(
                  labels.target_average,
                )}`,
              }}
            />
          </Col>
        </Row>
      </DraggableCard>
    );
  },
);

export default AddedElement;
