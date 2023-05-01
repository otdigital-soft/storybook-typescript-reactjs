import { Draggable } from 'react-beautiful-dnd';
import { DraggableContext } from 'components/DraggableTable';

const DraggableTableRow = ({
  index,
  draggableId,
  ...props
}: {
  draggableId?: number;
  index?: number;
}) => {
  if (draggableId === undefined || index === undefined) {
    // no drag and drop for empty/expanded rows
    return <tr {...props} />;
  }

  return (
    <Draggable draggableId={String(draggableId)} index={index}>
      {(provided, snapshot) => (
        <DraggableContext.Provider value={{ provided, snapshot }}>
          <tr
            {...props}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          />
        </DraggableContext.Provider>
      )}
    </Draggable>
  );
};

export default DraggableTableRow;
