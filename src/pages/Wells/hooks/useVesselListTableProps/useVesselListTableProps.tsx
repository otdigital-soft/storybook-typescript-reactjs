import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuItemProps, TableProps } from 'antd';
import { CompleteVesselUseList, PlannedVesselUseList } from 'api/schema';
import Button from 'components/Button';
import Menu from 'components/Menu';
import { useAddEditActions } from 'containers/AddEditActionsProvider';

interface UseVesselListTableProps<
  VesselUseListType,
  AddEditActionsContextType,
> {
  onDeleteVesselUse: (vesselUse: VesselUseListType) => void;
  extraActions?: {
    key: string;
    menuItemProps: (vesselUse: VesselUseListType) => MenuItemProps;
  }[];
  columns: NonNullable<TableProps<VesselUseListType>['columns']>;
  context: AddEditActionsContextType;
  editable: boolean;
  rowSelection?: boolean;
}

const useVesselListTableProps = <
  VesselUseListType extends CompleteVesselUseList | PlannedVesselUseList,
  AddEditActionsContextType extends string,
>({
  onDeleteVesselUse,
  extraActions,
  columns,
  context,
  editable,
  rowSelection,
}: UseVesselListTableProps<
  VesselUseListType,
  AddEditActionsContextType
>): TableProps<VesselUseListType> => {
  const {
    onEditRow: onEditVessel,
    setSelectedRows: setSelectedVesselUses,
    selectedRows: selectedVesselUses,
  } = useAddEditActions<AddEditActionsContextType>(context);

  return {
    pagination: false,
    locale: {
      emptyText: 'No vessel added',
    },
    rowSelection: rowSelection
      ? {
          type: 'checkbox',
          selectedRowKeys: selectedVesselUses,
          onChange: (rowKeysSelected: (string | number)[]) => {
            setSelectedVesselUses(rowKeysSelected.map(Number));
          },
        }
      : undefined,
    rowClassName: (vesselUse) => {
      if ('approved' in vesselUse && vesselUse.approved) {
        return 'ant-table-row-active';
      }
      return '';
    },
    columns: columns.concat([
      {
        title: '',
        key: 'actions',
        className: 'ant-table-cell-actions',
        width: 44,
        render: (vesselUse: VesselUseListType) => {
          const menu = (
            <Menu width={181}>
              <Menu.Item
                key="edit"
                onClick={() => onEditVessel(vesselUse.id)}
                disabled={!editable}
              >
                Edit
              </Menu.Item>
              {extraActions?.map((action) => (
                <Menu.Item
                  key={action.key}
                  {...action.menuItemProps(vesselUse)}
                />
              ))}
              <Menu.Item
                key="delete"
                onClick={() => onDeleteVesselUse(vesselUse)}
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
    rowKey: (vesselUse: VesselUseListType) => vesselUse.id,
  };
};

export default useVesselListTableProps;
