import Box, { BoxProps, Flexbox } from 'components/Box';
import { Text, Title } from 'components/Typography';
import { ReactComponent as DragOutlined } from 'assets/icons/DragOutlined.svg';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Card, CardBody } from './DraggableCard.styled';
import { forwardRef } from 'react';
import {
  DraggableProvidedDraggableProps,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';

interface DraggableCardProps extends BoxProps {
  title: string;
  elementName: string;
  onAdd?: () => void;
  onRemove?: () => void;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | undefined;
  children?: React.ReactNode;
}

const DraggableCard = forwardRef<HTMLDivElement, DraggableCardProps>(
  (
    {
      title,
      onAdd,
      onRemove,
      elementName,
      draggableProps,
      dragHandleProps,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Card ref={ref} flexDirection="column" {...draggableProps} {...props}>
        <Flexbox
          alignItems="center"
          paddingX={24}
          paddingY={16}
          gap={8}
          width="100%"
        >
          <Text
            fontSize={32}
            lineHeight={0}
            type="secondary"
            cursor="pointer"
            title={`Drag ${elementName}`}
            {...dragHandleProps}
          >
            <DragOutlined />
          </Text>
          <Box flexGrow={1}>
            <Title level={5}>{title}</Title>
          </Box>
          {onAdd ? (
            <Text
              fontSize={24}
              lineHeight={0}
              color="green.6"
              title={`Add ${elementName}`}
              cursor="pointer"
              onClick={onAdd}
            >
              <PlusCircleOutlined />
            </Text>
          ) : null}
          {onRemove ? (
            <Text
              fontSize={24}
              lineHeight={0}
              color="red.5"
              cursor="pointer"
              title={`Remove ${elementName}`}
              onClick={onRemove}
            >
              <CloseCircleOutlined />
            </Text>
          ) : null}
        </Flexbox>
        {children ? (
          <CardBody paddingX={24} paddingY={16}>
            {children}
          </CardBody>
        ) : null}
      </Card>
    );
  },
);

export default DraggableCard;
