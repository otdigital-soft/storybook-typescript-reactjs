import styled from 'styled-components';
import { Table as AntdTable } from 'antd';

const Table = styled(AntdTable)`
  .ant-table-bordered {
    > .ant-table-container > .ant-table-content > table {
      > thead > tr > th:not(:last-child),
      > tbody > tr > td:not(:last-child) {
        border-right: 0 none;
      }
    }
    .ant-table-container
      > .ant-table-content
      > table
      > tbody
      > tr:nth-child(even) {
      background-color: ${({ theme }) => theme.colors.gray[2]};
    }
  }
`;

export default Table as typeof AntdTable;
