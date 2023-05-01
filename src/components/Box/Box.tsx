import styled from 'styled-components';
import {
  layout,
  flexbox,
  SpaceProps,
  LayoutProps,
  FlexboxProps,
  PositionProps,
  color,
  position,
  space,
  border,
  BorderProps,
  ColorProps,
} from 'styled-system';
import { normalizeValue } from 'utils/style';

export type BoxProps = SpaceProps &
  LayoutProps &
  FlexboxProps &
  Omit<ColorProps, 'color'> &
  PositionProps &
  BorderProps & {
    color?: string & ColorProps['color'];
    gap?: string | number;
    visibility?: string;
    cursor?: string;
  };

const Box = styled.div<Partial<BoxProps>>`
  ${flexbox}
  ${layout}
  ${space}
  ${color}
  ${position}
  ${border}
  ${({ visibility }) =>
    visibility !== undefined ? `visibility: ${visibility};` : undefined}
  ${({ cursor }) => (cursor !== undefined ? `cursor: ${cursor};` : undefined)}
  ${({ gap }) =>
    gap !== undefined ? `gap: ${normalizeValue(gap)};` : undefined}
`;

export const Flexbox = styled(Box)`
  display: flex;
`;

export default Box;
