import styled from 'styled-components';
import { StyledTable } from 'components/Table';
import { Table as AntdTable } from 'antd';

const ActiveTable = styled(StyledTable)`
  .ant-table-tbody > tr {
    &.ant-table-row-selected {
      td {
        background-color: ${({ theme }) => theme.colors.turquoise['8']};
      }
    }
  }
` as typeof AntdTable;

export default ActiveTable;
