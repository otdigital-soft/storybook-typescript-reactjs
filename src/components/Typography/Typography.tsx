import styled from 'styled-components';
import { Typography } from 'antd';
import {
  color,
  ColorProps,
  display,
  DisplayProps,
  margin,
  MarginProps,
  typography,
  TypographyProps,
  width,
  WidthProps,
} from 'styled-system';

export const Title = styled(Typography.Title)<TypographyProps & ColorProps>`
  && {
    ${typography}
    ${color}
  }
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Text = styled(({ small, ...props }) => (
  <Typography.Text {...props} />
))<
  TypographyProps &
    ColorProps &
    DisplayProps &
    WidthProps & { small?: boolean; cursor?: string }
>`
  && {
    ${typography}
    ${color}
    ${display}
    ${width}
    ${({ cursor }) => (cursor ? `cursor: ${cursor}` : undefined)}
    ${({ small }) => (small ? 'font-size: 12px' : undefined)}
  }
`;

export const Paragraph = styled(Typography.Paragraph)<
  TypographyProps & ColorProps & MarginProps
>`
  && {
    ${typography}
    ${color}
    ${margin}
  }
`;
