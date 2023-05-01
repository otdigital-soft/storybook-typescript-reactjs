import { Table as AntdTable } from 'antd';
import Table from 'components/Table/index';
import styled from 'styled-components';

export const rowClassNames = {
  cursorPointer: 'cursor-pointer',
};

const StyledTable = styled(Table)`
  &.ant-table-with-actions .ant-table colgroup col:nth-last-child(2) {
    width: auto !important;
  }

  .ant-table-thead > tr > th {
    background-color: ${({ theme }) => theme.colors.gray['4']};
    border-bottom: 0 none;
    font-size: 12px;
    line-height: 22px;
    font-weight: 600;
    padding: 9px 8px;

    &:before {
      display: none;
    }

    &.ant-table-column-choose-columns {
      .ant-table-filter-column {
        justify-content: center;
      }

      .ant-table-column-title {
        display: none;
      }

      .ant-dropdown-trigger {
        margin: 0;
      }
    }
  }

  .ant-table-tbody > tr {
    & > td {
      padding: 12px 8px;
      font-size: 12px;
      line-height: 22px;
      border-bottom: 0 none;

      &.ant-table-selection-column {
        padding: 12px 16px;
      }

      &.ant-table-cell-actions {
        padding: 0;
      }
    }

    &:nth-child(even) > td {
      background-color: ${({ theme }) => theme.colors.gray['2']};
    }

    &.ant-table-row-active:not(.ant-table-row-selected):not(:hover) {
      > td {
        background-color: ${({ theme }) => theme.colors.turquoise['10']};
      }

      &:nth-child(even) > td {
        background-color: ${({ theme }) => theme.colors.turquoise['8']};
      }
    }

    &:hover,
    &.ant-table-row-selected {
      td {
        background-color: ${({ theme }) => theme.colors.sand['2']};
      }
    }
  }

  .ant-table
    > .ant-table-container
    > .ant-table-content
    > table
    > tbody
    > tr
    > td:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.colors.gray['4']};
  }

  .ant-table-row.${rowClassNames.cursorPointer} {
    .ant-table-cell {
      cursor: pointer;
    }
  }
` as typeof AntdTable;

export default StyledTable;
