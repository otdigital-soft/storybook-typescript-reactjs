import { Tabs as AntTabs } from 'antd';
import styled from 'styled-components';

const Tabs = styled(AntTabs)`
  &.ant-tabs-top > .ant-tabs-nav {
    margin: 0;

    &::before {
      border-bottom: 0 none;
    }

    .anticon {
      font-size: 16px;

      svg {
        width: 1em;
        height: 1em;
      }
    }
  }

  .ant-tabs-tab.ant-tabs-tab-active {
    .ant-tabs-tab-btn span {
      font-weight: 500;
    }

    .anticon {
      color: ${({ theme }) => theme.colors.red[6]};
    }
  }

  &.ant-tabs-card {
    .ant-tabs-tab {
      font-size: 14px;
      line-height: 22px;

      &.ant-tabs-tab-disabled {
        background: ${({ theme }) => theme.colors.gray[3]};
        color: ${({ theme }) => theme.colors.gray[5]};
      }
    }

    .ant-tabs-tab-active .ant-tabs-tab-btn {
      color: ${({ theme }) => theme.colors.blue[9]};
    }

    > .ant-tabs-nav .ant-tabs-tab {
      border-color: ${({ theme }) => theme.colors.gray[5]};

      &.ant-tabs-tab-active {
        border-bottom-color: ${({ theme }) => theme.colors.white};
      }
    }

    &.ant-tabs-top > .ant-tabs-nav {
      :before {
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray[4]};
      }
      .ant-tabs-tab {
        border-radius: 2px 2px 0 0;
      }
    }
  }
`;

export default Tabs;
