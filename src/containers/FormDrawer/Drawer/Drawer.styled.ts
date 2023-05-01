import { Drawer as AntdDrawer } from 'antd';
import styled from 'styled-components';

export const StyledDrawer = styled(AntdDrawer)`
  .ant-drawer-header {
    border-bottom: 0 none;
    box-shadow: ${({ theme }) => theme.shadows[2]};

    .ant-drawer-title {
      font-weight: 600;
      line-height: 24px;
    }

    .ant-drawer-extra .anticon {
      color: ${({ theme }) => theme.colors.gray[6]};
    }
  }

  .ant-drawer-body {
    padding: 20px;
  }

  .ant-drawer-footer {
    border-top: 0 none;
    padding: 20px;
  }
`;
