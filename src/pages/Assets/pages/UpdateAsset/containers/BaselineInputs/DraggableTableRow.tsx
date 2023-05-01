import { Draggable } from 'react-beautiful-dnd';
import { DraggableContext } from 'components/DraggableTable';
import { useTheme } from 'styled-components';

const DraggableTableRow = ({
  index,
  draggableId,
  ...props
}: {
  draggableId: number;
  index: number;
}) => {
  const { colors } = useTheme();
  if (draggableId === undefined || index === undefined) {
    // no drag and drop for empty row
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
            style={{
              ...provided.draggableProps.style,
              backgroundColor: snapshot.isDragging ? colors.white : 'inherit',
            }}
          />
        </DraggableContext.Provider>
      )}
    </Draggable>
  );
};

export default DraggableTableRow;
