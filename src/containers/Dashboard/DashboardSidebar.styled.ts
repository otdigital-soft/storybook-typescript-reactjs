import { LogoutOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';

export const Sider = styled(Layout.Sider)`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.shadows[0]};
  height: 100vh;
  position: sticky;
  top: 0;

  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`;

export const Logo = styled.img`
  width: 160px;
`;

export const StyledMenu = styled(Menu)`
  font-size: 14px;

  &.ant-menu {
    .ant-menu-item {
      font-size: 14px;

      &.ant-menu-item-selected {
        background-color: ${({ theme }) => theme.colors.gray[2]};

        .ant-menu-item-icon {
          color: ${({ theme }) => theme.colors.red[6]};
        }

        .ant-menu-title-content {
          font-weight: 600;
          color: ${({ theme }) => theme.colors.text.primary};
        }
      }

      &:after {
        border-right: 0 none;
      }
    }

    > .ant-menu-item.ant-menu-item-selected {
      background-color: ${({ theme }) => theme.colors.salomn[10]};
    }

    .ant-menu-submenu {
      .ant-menu-submenu-title {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.text.primary};

        .ant-menu-title-content + .anticon {
          font-size: 12px;
          min-width: 12px;
        }
      }
    }

    .ant-menu-submenu-selected {
      background-color: ${({ theme }) => theme.colors.salomn[10]};

      .ant-menu-submenu-selected {
        background-color: ${({ theme }) => theme.colors.gray[4]};
      }
    }
  }
`;

export const LogoutIcon = styled(LogoutOutlined)`
  color: ${({ theme }) => theme.colors.red[6]};
  cursor: pointer;
  font-size: 16px;
`;
