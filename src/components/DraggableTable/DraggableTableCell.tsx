import React, { useCallback, useContext, useState } from 'react';
import { DraggableContext } from './DraggableContext';

const DraggableTableCell = (props: { children: React.ReactNode }) => {
  const [cellWidth, setWidth] = useState<number | undefined>(undefined);
  const draggableContext = useContext(DraggableContext);
  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <td
      {...props}
      ref={measuredRef}
      width={draggableContext?.snapshot.isDragging ? cellWidth : undefined}
    />
  );
};

export default DraggableTableCell;
