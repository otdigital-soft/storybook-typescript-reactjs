import styled from 'styled-components';
import { Flexbox } from 'components/Box';

export const Card = styled(Flexbox)`
  border: 1px solid ${({ theme }) => theme.colors.gray[5]};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CardBody = styled(Flexbox)`
  border-top: 1px solid ${({ theme }) => theme.colors.gray[5]};
`;
