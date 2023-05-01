import { DroppableTableBody as BaseDroppableTableBody } from 'components/DraggableTable';
import React from 'react';

const DroppableTableBody = (props: { children: React.ReactNode }) => {
  return <BaseDroppableTableBody droppableId="phases" {...props} />;
};

export default DroppableTableBody;
