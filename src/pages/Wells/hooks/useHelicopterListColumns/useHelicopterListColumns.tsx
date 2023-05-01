import {
  CompleteHelicopterUseList,
  PlannedHelicopterUseList,
} from 'api/schema';
import CheckMark from 'pages/Wells/components/CheckMark';
import { Flexbox } from 'components/Box';
import { useMemo } from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import Menu from 'components/Menu';
import { Dropdown, MenuItemProps } from 'antd';
import Button from 'components/Button';
import { MoreOutlined } from '@ant-design/icons';

const useHelicopterListColumns = <
  HelicopterUseList extends
    | CompleteHelicopterUseList
    | PlannedHelicopterUseList,
>({
  onEditHelicopter,
  editable,
  onDeleteHelicopter,
  extraActions,
}: {
  onEditHelicopter: (helicopterId: number) => void;
  onDeleteHelicopter: (helicopter: HelicopterUseList) => void;
  editable: boolean;
  extraActions?: {
    key: string;
    menuItemProps: (helicopterUse: HelicopterUseList) => MenuItemProps;
  }[];
}): ColumnsType<HelicopterUseList> => {
  return useMemo(() => {
    return [
      {
        title: 'Type',
        dataIndex: 'helicopter_type',
        width: 300,
        render: (helicopterType: HelicopterUseList['helicopter_type']) => {
          return helicopterType.type;
        },
      },
      {
        title: 'Number of round trips',
        dataIndex: 'trips',
        width: 250,
      },
      {
        title: 'Flight time per round trip (minutes)',
        dataIndex: 'trip_duration',
        width: 250,
      },
      {
        title: 'Quota obligation',
        dataIndex: 'quota_obligation',
        width: 135,
        render: (value: HelicopterUseList['quota_obligation']) => {
          return (
            <Flexbox justifyContent="center">
              <CheckMark checked={!!value} />
            </Flexbox>
          );
        },
      },
      {
        title: '% exposure against current well',
        dataIndex: 'exposure_against_current_well',
        width: 431,
        render: (value: HelicopterUseList['exposure_against_current_well']) => {
          return `${value}%`;
        },
      },
      {
        title: '',
        key: 'actions',
        className: 'ant-table-cell-actions',
        width: 44,
        render: (helicopterUse: HelicopterUseList) => {
          const menu = (
            <Menu width={181}>
              <Menu.Item
                key="edit"
                onClick={() => onEditHelicopter(helicopterUse.id)}
                disabled={!editable}
              >
                Edit
              </Menu.Item>
              {extraActions?.map((action) => (
                <Menu.Item
                  key={action.key}
                  {...action.menuItemProps(helicopterUse)}
                />
              ))}
              <Menu.Item
                key="delete"
                onClick={() => onDeleteHelicopter(helicopterUse)}
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
    ];
  }, [editable, extraActions, onDeleteHelicopter, onEditHelicopter]);
};

export default useHelicopterListColumns;
