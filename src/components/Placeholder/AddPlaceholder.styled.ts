import styled from 'styled-components';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Container } from './Placeholder.styled';

export const AddContainer = styled(Container)<{ maxWidth?: number }>`
  cursor: pointer;
  ${({ maxWidth }) =>
    maxWidth !== undefined ? `max-width: ${maxWidth}px;` : undefined}
`;

export const AddIcon = styled(PlusCircleOutlined)`
  font-size: 42px;
  color: ${({ theme }) => theme.colors.green[12]};
`;

export const TitleContainer = styled.div`
  width: calc(100% - 164px);
  left: 82px;
  position: absolute;
`;
