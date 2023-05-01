import styled from 'styled-components';
import { StyledTable as Table } from 'components/Table';
import { Table as AntdTable } from 'antd';

export const InputTable = styled(Table)`
  && {
    .ant-table-tbody .ant-table-cell {
      padding: 14px 9px 15px;
    }
  }
` as typeof AntdTable;
