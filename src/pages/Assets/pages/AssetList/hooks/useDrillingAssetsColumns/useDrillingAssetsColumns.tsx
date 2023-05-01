import { ColumnsType } from 'antd/lib/table/interface';
import Box from 'components/Box';
import Menu from 'components/Menu';
import { Dropdown } from 'antd';
import Button from 'components/Button';
import { MoreOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { AssetList } from 'api/schema';
import { ASSET_TYPE_NAME_MAP } from 'pages/Assets/consts';
import { generatePath, useNavigate } from 'react-router-dom';
import routes from 'routes';
import useDuplicateAsset from '../useDuplicateAsset';
import useDeleteAsset from '../useDeleteAsset';
import StatusCell from 'pages/Assets/components/StatusCell';

const useDrillingAssetsColumns = () => {
  const navigate = useNavigate();
  const { isDuplicatingAsset, onDuplicateAsset } = useDuplicateAsset();
  const { isDeletingAsset, onDeleteAsset } = useDeleteAsset();

  const columns: ColumnsType<AssetList> = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: 200,
        render: (type: AssetList['type']) => {
          return ASSET_TYPE_NAME_MAP[type];
        },
      },
      {
        title: 'Design description',
        dataIndex: 'design_description',
        width: 363,
      },
      {
        title: 'Status',
        dataIndex: 'draft',
        width: 200,
        render: (draft: AssetList['draft']) => {
          return <StatusCell draft={draft} />;
        },
      },
      {
        title: '',
        key: 'actions',
        className: 'ant-table-cell-actions',
        width: 48,
        render: (asset: AssetList) => {
          const menu = (
            <Menu
              width={181}
              onClick={({ domEvent }) => {
                domEvent.stopPropagation();
              }}
            >
              <Menu.Item
                key="edit"
                onClick={() => {
                  navigate(
                    generatePath(routes.updateAsset, {
                      assetId: String(asset.id),
                    }),
                  );
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="duplicate"
                onClick={() => onDuplicateAsset(asset)}
                disabled={isDuplicatingAsset}
              >
                Duplicate
              </Menu.Item>
              <Menu.Item
                key="delete"
                disabled={isDeletingAsset}
                onClick={() => onDeleteAsset(asset)}
              >
                Delete
              </Menu.Item>
            </Menu>
          );
          return (
            <Dropdown overlay={menu} trigger={['click']}>
              <Box onClick={(event) => event.stopPropagation()}>
                <Button type="link" icon={<MoreOutlined />} block />
              </Box>
            </Dropdown>
          );
        },
      },
    ],
    [
      isDeletingAsset,
      isDuplicatingAsset,
      navigate,
      onDeleteAsset,
      onDuplicateAsset,
    ],
  );

  return columns;
};

export default useDrillingAssetsColumns;
