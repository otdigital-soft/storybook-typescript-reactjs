import { Switch as AntdSwitch } from 'antd';
import styled from 'styled-components';

const Switch = styled(AntdSwitch)`
  background-color: ${({ theme }) => theme.colors.red[6]};

  &.ant-switch-checked {
    background-color: ${({ theme }) => theme.colors.green[6]};
  }
`;

export default Switch;
