import { DownOutlined, MoreOutlined, UpOutlined } from '@ant-design/icons';
import {
  WellPlannerDetailsCompleteStep,
  WellPlannerDetailsPlannedStep,
} from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { ExpandedRowRender } from 'rc-table/lib/interface';
import { Dropdown, MenuItemProps, TableProps } from 'antd';
import Menu from 'components/Menu';
import Button from 'components/Button';
import React from 'react';
import {
  DroppableTableBody,
  DraggableTableRow,
} from 'pages/Wells/components/PhaseTable';
import { DraggableTableCell } from 'components/DraggableTable';

interface UsePhaseListTableProps<
  PhaseType extends
    | WellPlannerDetailsPlannedStep
    | WellPlannerDetailsCompleteStep,
  AddEditActionsContextType,
> {
  selectedRowKeys: number[];
  expandable: boolean;
  expandedRowRender?: ExpandedRowRender<PhaseType>;
  context: AddEditActionsContextType;
  columns: NonNullable<TableProps<PhaseType>['columns']>;
  rowSelection?: boolean;
  extraActions?: {
    key: string;
    menuItemProps: (phase: PhaseType) => MenuItemProps;
  }[];
  editable: boolean;
  onDeletePhase: (phase: PhaseType) => void;
  onDuplicatePhase: (phase: PhaseType) => void;
}

const usePhaseListTableProps = <
  PhaseType extends
    | WellPlannerDetailsPlannedStep
    | WellPlannerDetailsCompleteStep,
  AddEditActionsContextType extends string,
>({
  selectedRowKeys,
  expandedRowRender,
  expandable,
  context,
  columns,
  rowSelection,
  editable,
  extraActions,
  onDeletePhase,
  onDuplicatePhase,
}: UsePhaseListTableProps<
  PhaseType,
  AddEditActionsContextType
>): TableProps<PhaseType> => {
  const { setSelectedRows: setSelectedPhases, onEditRow: onEditPhase } =
    useAddEditActions<AddEditActionsContextType>(context);
  return {
    pagination: false,
    locale: {
      emptyText: 'No phase added',
    },
    expandable: expandable
      ? {
          expandIcon: ({ record, expanded, onExpand }) =>
            expanded ? (
              <UpOutlined onClick={(event) => onExpand(record, event)} />
            ) : (
              <DownOutlined onClick={(event) => onExpand(record, event)} />
            ),
          expandedRowRender,
        }
      : undefined,
    rowSelection: rowSelection
      ? {
          type: 'checkbox',
          selectedRowKeys,
          onChange: (rowKeysSelected: (string | number)[]) => {
            setSelectedPhases(rowKeysSelected.map(Number));
          },
        }
      : undefined,
    rowClassName: (phase) => {
      if ('approved' in phase && phase.approved) {
        return 'ant-table-row-active';
      }
      return '';
    },
    onRow: (phase, index) => {
      const attr = {
        index,
        draggableId: phase.id,
      };
      return attr as React.HTMLAttributes<unknown>;
    },
    components: editable
      ? {
          body: {
            wrapper: DroppableTableBody,
            row: DraggableTableRow,
            cell: DraggableTableCell,
          },
        }
      : undefined,
    columns: columns.concat([
      {
        title: '',
        key: 'actions',
        className: 'ant-table-cell-actions',
        width: 44,
        render: (phase: PhaseType) => {
          const menu = (
            <Menu width={181}>
              <Menu.Item
                key="edit"
                onClick={() => onEditPhase(phase.id)}
                disabled={!editable}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="duplicate"
                onClick={() => onDuplicatePhase(phase)}
                disabled={!editable}
              >
                Duplicate
              </Menu.Item>
              {extraActions?.map((action) => (
                <Menu.Item key={action.key} {...action.menuItemProps(phase)} />
              ))}
              <Menu.Item
                key="delete"
                onClick={() => onDeletePhase(phase)}
                disabled={!editable}
              >
                Delete
              </Menu.Item>
            </Menu>
          );
          return (
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="link" icon={<MoreOutlined />} />
            </Dropdown>
          );
        },
      },
    ]),
    className: 'ant-table-with-actions',
    rowKey: (phase) => phase.id,
  };
};

export default usePhaseListTableProps;
