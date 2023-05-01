import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { HelicopterTypeList } from 'api/schema';
import Button from 'components/Button';
import Menu from 'components/Menu';
import { CO2, CUBIC_METRE } from 'consts/format';
import { useMemo } from 'react';
import useDeleteHelicopterType from '../useDeleteHelicopterType';

import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { AssetListAddEditActionContext } from 'pages/Assets/pages/AssetList/types';

const useHelicoptersColumns = () => {
  const { onEditRow: onEditHelicopterType } =
    useAddEditActions<AssetListAddEditActionContext>('helicopters');
  const { onDeleteHelicopterType, isDeletingHelicopterType } =
    useDeleteHelicopterType();
  const columns: ColumnsType<HelicopterTypeList> = useMemo(
    () => [
      {
        title: 'Type',
        dataIndex: 'type',
        width: 140,
      },
      {
        title: `Ton ${CO2}/${CUBIC_METRE} fuel`,
        dataIndex: 'co2_per_fuel',
        width: 130,
      },
      {
        title: `kg NOx/${CUBIC_METRE} fuel`,
        dataIndex: 'nox_per_fuel',
        width: 120,
      },
      {
        title: `Fuel consumption (Litres/h)`,
        dataIndex: 'fuel_consumption',
        width: 190,
      },
      {
        title: `Fuel cost (USD/${CUBIC_METRE})`,
        dataIndex: 'fuel_cost',
        width: 160,
      },
      {
        title: `${CO2} tax (USD/${CUBIC_METRE})`,
        dataIndex: 'co2_tax',
        width: 160,
      },
      {
        title: `NOx tax (USD/${CUBIC_METRE})`,
        dataIndex: 'nox_tax',
        width: 140,
      },
      {
        title: `Total fuel cost (USD/${CUBIC_METRE})`,
        key: 'total',
        width: 170,
        render: (helicopterType: HelicopterTypeList) => {
          return (
            helicopterType.fuel_cost +
            helicopterType.co2_tax +
            helicopterType.nox_tax
          );
        },
      },
      {
        title: '',
        key: 'actions',
        className: 'ant-table-cell-actions',
        width: 48,
        render: (helicopterType: HelicopterTypeList) => {
          const menu = (
            <Menu width={181}>
              <Menu.Item
                key="edit"
                onClick={() => onEditHelicopterType(helicopterType.id)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                disabled={isDeletingHelicopterType}
                onClick={() => onDeleteHelicopterType({ helicopterType })}
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
    [isDeletingHelicopterType, onDeleteHelicopterType, onEditHelicopterType],
  );

  return columns;
};

export default useHelicoptersColumns;
