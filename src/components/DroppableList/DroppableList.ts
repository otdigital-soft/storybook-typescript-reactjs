import styled, { css } from 'styled-components';
import { Flexbox } from 'components/Box';

const DroppableList = styled(Flexbox)<{ isDraggingOver: boolean }>`
  gap: 20px;
  flex-direction: column;

  ${({ isDraggingOver }) =>
    isDraggingOver
      ? css`
          border: 1px dashed ${({ theme }) => theme.colors.gray[5]};
          border-radius: 4px;
        `
      : undefined}
`;

export default DroppableList;
