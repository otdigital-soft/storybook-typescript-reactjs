import { DragOutlined } from '@ant-design/icons';
import { Flexbox } from 'components/Box';
import { useContext } from 'react';
import { DraggableContext } from 'components/DraggableTable';

const DragHandle = () => {
  const context = useContext(DraggableContext);
  return (
    <Flexbox
      justifyContent="center"
      paddingY={8}
      {...context?.provided.dragHandleProps}
    >
      <DragOutlined />
    </Flexbox>
  );
};

export default DragHandle;
