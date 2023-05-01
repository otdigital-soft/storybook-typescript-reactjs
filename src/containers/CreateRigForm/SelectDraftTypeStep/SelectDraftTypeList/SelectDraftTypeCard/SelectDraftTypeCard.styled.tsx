import { CardHeader } from 'components/ElementCard/ElementCard.styled';
import styled from 'styled-components';
import { FlexboxProps } from 'styled-system';

type DraftTypeCardHeaderProps = FlexboxProps & {
  disabled?: boolean;
};

export const DraftTypeCardHeader = styled(CardHeader)<DraftTypeCardHeaderProps>`
  border-bottom: 0;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray[1] : theme.colors.white};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  .ant-typography {
    color: ${({ theme, disabled }) =>
      disabled ? theme.colors.gray[5] : theme.colors.text.primary};
  }
`;
