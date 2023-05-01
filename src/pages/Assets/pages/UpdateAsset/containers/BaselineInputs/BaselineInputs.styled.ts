import { StyledTable as Table } from 'components/Table';
import styled from 'styled-components';
import { Table as AntdTable } from 'antd';
import FormSelect from 'components/FormSelect';
import FormInputNumber from 'components/FormInputNumber';

export const InputTable = styled(Table)`
  && {
    .ant-table-tbody .ant-table-cell {
      padding: 12px 10px;

      &.ant-table-cell-fix-left {
        z-index: 3;
      }
    }

    .ant-table-thead .ant-table-filter-trigger {
      margin-right: -4px;
    }
  }
` as typeof AntdTable;

export const InputFormSelect = styled(FormSelect)`
  & {
    margin-bottom: 0;
    max-width: 207px;
  }

  .ant-form-item-control-input {
    min-height: 37px;
  }

  && .ant-select-selector {
    height: 37px;

    &::after {
      line-height: 37px;
    }

    > .ant-select-selection-item {
      line-height: 35px;
    }

    .ant-select-selection-search input {
      height: 35px;
    }

    .ant-select-selection-placeholder {
      line-height: 35px;
    }
  }
`;

export const InputFormInputNumber = styled(FormInputNumber)`
  & {
    margin-bottom: 0;
    max-width: 207px;
  }

  .ant-form-item-control-input {
    min-height: 37px;

    .ant-input-number-input {
      height: 35px;
    }
  }
`;
