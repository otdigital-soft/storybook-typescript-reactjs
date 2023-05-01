import Table from 'components/Table';
import styled from 'styled-components';
import { Button, Table as AntdTable } from 'antd';

export const PhaseMaterialsTable = styled(Table)`
  && {
    .ant-table-thead .ant-table-cell {
      padding-bottom: 0;
    }

    .ant-table-cell {
      background: none;
      border-bottom: none;
      padding: 0 10px 0 0;

      &::before {
        display: none;
      }

      &.ant-table-cell-row-hover {
        background: none;
      }
    }

    .ant-table-tbody .ant-table-cell {
      &.ant-table-cell-remove,
      &.ant-table-cell-quota {
        vertical-align: top;
      }

      &.ant-table-cell-unit {
        padding-top: 10px;
        vertical-align: top;
      }
    }
  }
` as typeof AntdTable;

export const AddMaterialButton = styled(Button)`
  && {
    color: ${({ theme }) => theme.colors.gray['6']};
    font-weight: 400;
  }
`;

export const RemoveMaterialButton = styled(Button)`
  && {
    border-color: ${({ theme }) => theme.colors.red['6']};
    color: ${({ theme }) => theme.colors.red['6']};
  }
`;
