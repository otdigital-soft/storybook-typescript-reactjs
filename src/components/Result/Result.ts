import styled from 'styled-components';
import { Result as AntdResult } from 'antd';

const Result = styled(AntdResult)`
  &.ant-result-success .ant-result-icon > .anticon {
    color: ${({ theme }) => theme.colors.green[12]};
  }
`;

export default Result;
