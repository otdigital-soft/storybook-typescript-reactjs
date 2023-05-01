import Tabs from 'components/Tabs/index';
import styled from 'styled-components';

export const LayoutTabs = styled(Tabs)`
  & .ant-tabs-tab + .ant-tabs-tab {
    margin: 0 0 0 10px;
  }

  .ant-tabs-tab .anticon {
    margin-right: 0;
  }

  &.ant-tabs-top > .ant-tabs-nav .anticon {
    font-size: 24px;
  }
`;
