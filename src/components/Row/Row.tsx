import styled from 'styled-components';
import Box from 'components/Box';

export const FixedRow = styled(Box)`
  width: calc(100% - 256px);
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 10;
`;

export const SubmitRow = styled(FixedRow)`
  gap: 8px;
  padding: 21px 24px;
  box-shadow: ${({ theme }) => theme.shadows[1]};
`;
