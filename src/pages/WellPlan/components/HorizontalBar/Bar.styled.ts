import Box from 'components/Box';
import styled from 'styled-components';

export const StyledBar = styled(Box)`
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[3]};
    z-index: 1;
  }
`;
