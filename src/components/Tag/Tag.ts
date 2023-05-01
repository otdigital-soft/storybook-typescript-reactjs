import { Tag as AntdTag } from 'antd';
import styled from 'styled-components';

const Tag = styled(AntdTag)`
  &.ant-tag-success {
    border-color: ${({ theme }) => theme.colors.green[3]};
    background: ${({ theme }) => theme.colors.green[1]};
    color: ${({ theme }) => theme.colors.green[6]};
  }

  &.ant-tag-geekblue {
    border-color: ${({ theme }) => theme.colors.geekblue[3]};
    background: ${({ theme }) => theme.colors.geekblue[1]};
    color: ${({ theme }) => theme.colors.geekblue[6]};
  }
`;

export default Tag;
