import Menu from 'components/Menu';
import styled from 'styled-components';

export const StyledMenu = styled(Menu)`
  border-radius: 8px;

  .ant-menu-item {
    height: 36px;
    line-height: 36px;
    margin-top: 0;
    margin-bottom: 0;
    padding: 0 14px;

    & .ant-menu-title-content {
      display: flex;
    }
    &:first-child {
      margin-top: 4px;
    }
    &:not(:last-child) {
      margin-bottom: 0;
    }
    &:last-child {
      margin-bottom: 14px;
    }
  }

  .ant-checkbox-wrapper {
    .ant-checkbox + span {
      font-size: 10px;
      line-height: 16px;
    }
  }
`;
