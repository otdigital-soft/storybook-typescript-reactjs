import { createContext } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

export const DraggableContext = createContext<{
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
} | null>(null);
