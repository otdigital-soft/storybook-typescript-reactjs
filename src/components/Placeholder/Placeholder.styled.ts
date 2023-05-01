import { Flexbox } from 'components/Box';
import styled from 'styled-components';

export const Container = styled(Flexbox)`
  border: 1px dashed ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
  justify-content: center;
  align-items: center;
`;
