import { Checkbox } from 'antd';
import styled from 'styled-components';

export const StyledCheckbox = styled(Checkbox)`
  .ant-checkbox {
    width: 48px;
    height: 29px;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;

    &.ant-checkbox-checked::after {
      border: 0 none;
    }
  }

  .ant-checkbox + span {
    line-height: 29px;
    font-size: 12px;
  }
`;
