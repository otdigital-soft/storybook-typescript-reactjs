import { Menu as AntdMenu } from 'antd';
import styled from 'styled-components';

export const Menu = styled(AntdMenu)<{ width?: number }>`
  ${({ width }) =>
    width !== undefined
      ? `
          width: ${width}px;
        `
      : undefined}
`;

export default Menu;
