import { TableProps } from 'antd';
import {
  CompleteHelicopterUseList,
  PlannedHelicopterUseList,
} from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';

interface UseHelicopterListTableProps<AddEditActionsContextType> {
  context: AddEditActionsContextType;
  rowSelection?: boolean;
}

const useHelicopterListTableProps = <
  HelicopterUseListType extends
    | CompleteHelicopterUseList
    | PlannedHelicopterUseList,
  AddEditActionsContextType extends string,
>({
  context,
  rowSelection,
}: UseHelicopterListTableProps<AddEditActionsContextType>): TableProps<HelicopterUseListType> => {
  const {
    setSelectedRows: setSelectedHelicopters,
    selectedRows: selectedHelicopters,
  } = useAddEditActions<AddEditActionsContextType>(context);

  return {
    pagination: false,
    locale: {
      emptyText: 'No helicopter added',
    },
    rowSelection: rowSelection
      ? {
          type: 'checkbox',
          selectedRowKeys: selectedHelicopters,
          onChange: (rowKeysSelected: (string | number)[]) => {
            setSelectedHelicopters(rowKeysSelected.map(Number));
          },
        }
      : undefined,
    rowClassName: (helicopterUse) => {
      if ('approved' in helicopterUse && helicopterUse.approved) {
        return 'ant-table-row-active';
      }
      return '';
    },
    className: 'ant-table-with-actions',
    rowKey: (helicopterUse: HelicopterUseListType) => helicopterUse.id,
  };
};

export default useHelicopterListTableProps;
