import styled from 'styled-components';
import { BellOutlined } from '@ant-design/icons';
import { Menu as AntdMenu } from 'antd';

export const NotificationBellOutlined = styled(BellOutlined)<{ color: string }>`
  font-size: 24px;
  color: ${({ color }) => color};
`;

export const NotificationDot = styled.div`
  background-color: ${({ theme }) => theme.colors.red[6]};
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

export const Menu = styled(AntdMenu)`
  width: 231px;
`;

export const MenuItem = styled(AntdMenu.Item)`
  overflow-x: hidden;
  .ant-dropdown-menu-title-content {
    overflow-x: hidden;
  }
`;
