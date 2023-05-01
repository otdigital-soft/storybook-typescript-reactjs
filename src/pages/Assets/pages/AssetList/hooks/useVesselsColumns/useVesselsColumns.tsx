import { ColumnsType } from 'antd/lib/table/interface';
import Menu from 'components/Menu';
import { Dropdown } from 'antd';
import Button from 'components/Button';
import { MoreOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { VesselTypeList } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { CO2, CUBIC_METRE } from 'consts/format';
import useDeleteVesselType from '../../hooks/useDeleteVesselType';
import { AssetListAddEditActionContext } from 'pages/Assets/pages/AssetList/types';

const useVesselsColumns = () => {
  const { onEditRow: onEditVesselType } =
    useAddEditActions<AssetListAddEditActionContext>('vessels');
  const { onDeleteVesselType, isDeletingVesselType } = useDeleteVesselType();
  const columns: ColumnsType<VesselTypeList> = useMemo(
    () => [
      {
        title: 'Type',
        dataIndex: 'type',
        width: 190,
      },
      {
        title: 'Fuel type',
        dataIndex: 'fuel_type',
        width: 190,
      },
      {
        title: `Fuel con. summer (${CUBIC_METRE}/day)`,
        dataIndex: 'fuel_consumption_summer',
        width: 190,
      },
      {
        title: `Fuel con. winter (${CUBIC_METRE}/day)`,
        dataIndex: 'fuel_consumption_winter',
        width: 190,
      },
      {
        title: `Ton ${CO2}/${CUBIC_METRE} fuel`,
        dataIndex: 'co2_per_fuel',
        width: 190,
      },
      {
        title: `kg NOx/${CUBIC_METRE} fuel`,
        dataIndex: 'nox_per_fuel',
        width: 190,
      },
      {
        title: `${CO2} tax (USD/${CUBIC_METRE}) `,
        dataIndex: 'co2_tax',
        width: 190,
      },
      {
        title: '',
        key: 'actions',
        className: 'ant-table-cell-actions',
        width: 48,
        render: (vesselType: VesselTypeList) => {
          const menu = (
            <Menu width={181}>
              <Menu.Item
                key="edit"
                onClick={() => onEditVesselType(vesselType.id)}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                disabled={isDeletingVesselType}
                onClick={() =>
                  onDeleteVesselType({
                    vesselType,
                  })
                }
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
    [isDeletingVesselType, onDeleteVesselType, onEditVesselType],
  );

  return columns;
};

export default useVesselsColumns;
