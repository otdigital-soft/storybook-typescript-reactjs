import { Divider as AntdDivider } from 'antd';
import styled from 'styled-components';
import { normalizeValue } from 'utils/style';

const Divider = styled(AntdDivider)<{ height?: string | number }>`
  && {
    ${({ height }) =>
      height !== undefined ? `height: ${normalizeValue(height)}` : undefined}
  }
  &.ant-divider-horizontal {
    margin: 11px 0;
  }
`;

export default Divider;
