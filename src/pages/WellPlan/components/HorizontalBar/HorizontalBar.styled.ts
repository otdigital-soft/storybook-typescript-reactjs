import styled from 'styled-components';

export const Separator = styled.div<{
  borderColor: string;
  borderStyle: string;
}>`
  flex-shrink: 0;
  border-right: ${({ borderStyle, borderColor }) =>
    `1px ${borderStyle} ${borderColor}`};
`;
