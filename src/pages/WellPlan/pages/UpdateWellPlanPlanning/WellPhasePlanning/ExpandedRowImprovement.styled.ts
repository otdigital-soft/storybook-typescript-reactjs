import styled from 'styled-components';

export const Container = styled.div`
  padding: 1px 2px 9px 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 26px;
`;

export const Separator = styled.div`
  border-left: 1px solid ${({ theme }) => theme.colors.sand['1']};
  height: calc(100% + 2 * 12px);
  margin-top: -12px;
`;
