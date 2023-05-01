import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

interface TableBodyProps {
  children: React.ReactNode;
  droppableId: string;
}

const DroppableTableBody = ({ droppableId, ...props }: TableBodyProps) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <>
          <tbody
            {...props}
            ref={provided.innerRef}
            {...provided.droppableProps}
          />
          {provided.placeholder}
        </>
      )}
    </Droppable>
  );
};

export default DroppableTableBody;
