import type { DraggableLocation } from 'react-beautiful-dnd';

type DraggableMap<T> = {
  [key: string]: T[];
};

// a little function to help us with reordering the result
export const reorder = <T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

type ReorderDraggableMapArgs<T> = {
  draggableMap: DraggableMap<T>;
  source: DraggableLocation;
  destination: DraggableLocation;
};

export const reorderDraggableMap = <T>({
  draggableMap,
  source,
  destination,
}: ReorderDraggableMapArgs<T>): DraggableMap<T> => {
  const current = [...draggableMap[source.droppableId]];
  const next = [...draggableMap[destination.droppableId]];
  const target = current[source.index];

  // did not move anywhere - can bail early
  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return draggableMap;
  }

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    return {
      ...draggableMap,
      [source.droppableId]: reordered,
    };
  }

  // moving to different list

  // remove from original
  current.splice(source.index, 1);
  // insert into next
  next.splice(destination.index, 0, target);

  return {
    ...draggableMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };
};
