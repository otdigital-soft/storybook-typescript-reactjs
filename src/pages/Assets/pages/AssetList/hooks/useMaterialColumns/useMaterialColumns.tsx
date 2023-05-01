import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { MaterialCategoryEnum, MaterialTypeList } from 'api/schema';
import Button from 'components/Button';
import Menu from 'components/Menu';
import { CO2 } from 'consts/format';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { MATERIAL_CATEGORY_NAME_MAP } from 'pages/Assets/consts';
import { useMemo } from 'react';
import { AssetListAddEditActionContext } from '../../types';
import useDeleteMaterialType from '../useDeleteMaterialType';

const useMaterialColumns = () => {
  const { onEditRow: onEditMaterialType } =
    useAddEditActions<AssetListAddEditActionContext>('materials');
  const { onDeleteMaterialType, isDeletingMaterialType } =
    useDeleteMaterialType();

  const columns: ColumnsType<MaterialTypeList> = useMemo(
    () => [
      {
        title: 'Category',
        dataIndex: 'category',
        width: 200,
        render: (category: MaterialCategoryEnum) =>
          MATERIAL_CATEGORY_NAME_MAP[category],
      },
      {
        title: `Type`,
        dataIndex: 'type',
        width: 200,
      },
      {
        title: `Unit`,
        dataIndex: 'unit',
        width: 200,
      },
      {
        title: `${CO2} emission (Ton/unit)`,
        dataIndex: 'co2',
        width: 200,
      },
      {
        title: '',
        key: 'actions',
        className: 'ant-table-cell-actions',
        width: 48,
        render: (materialType: MaterialTypeList) => {
          const menu = (
            <Menu width={181}>
              <Menu.Item
                key="edit"
                onClick={() => onEditMaterialType(materialType.id)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                onClick={() => onDeleteMaterialType({ materialType })}
                disabled={isDeletingMaterialType}
              >
                Delete
              </Menu.Item>
            </Menu>
          );
          return (
            <Dropdown overlay={menu} trigger={['click']}>
              <Button type="link" icon={<MoreOutlined />} block />
            </Dropdown>
          );
        },
      },
    ],
    [onDeleteMaterialType, isDeletingMaterialType, onEditMaterialType],
  );

  return columns;
};

export default useMaterialColumns;
