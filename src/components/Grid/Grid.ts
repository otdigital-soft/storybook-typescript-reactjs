import styled from 'styled-components';
import { Row as AntdRow, RowProps as AntdRowProps } from 'antd';
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';

export type RowProps = AntdRowProps & LayoutProps & FlexboxProps & SpaceProps;

export const Row = styled(AntdRow)<RowProps>`
  ${flexbox}
  ${layout}
  ${space}
`;
