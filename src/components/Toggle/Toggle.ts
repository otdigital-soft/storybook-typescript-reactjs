import Tag from 'components/Tag';
import styled, { css } from 'styled-components';

export const Toggle = styled(Tag)<{ selected: boolean }>`
  cursor: pointer;
  border-radius: 12px;
  padding: 4px 14px 4px 14px;

  ${({ selected, theme }) =>
    selected
      ? css`
          background-color: ${theme.colors.red['11']};
          border-color: ${theme.colors.red['11']};
          color: ${theme.colors.white};
        `
      : undefined}
`;

export default Toggle;
