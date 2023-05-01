import { forwardRef } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { FormWellValues } from 'containers/PlanForm/form';
import DraggableCard from 'components/DraggableCard';

interface AvailableWellProps {
  well: FormWellValues;
  onAdd: () => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
}

const AvailableWell = forwardRef<HTMLDivElement, AvailableWellProps>(
  ({ well, onAdd, draggableProps, dragHandleProps }, ref) => {
    return (
      <DraggableCard
        ref={ref}
        title={well.name}
        elementName="well"
        onAdd={onAdd}
        draggableProps={draggableProps}
        dragHandleProps={dragHandleProps}
      />
    );
  },
);
export default AvailableWell;
