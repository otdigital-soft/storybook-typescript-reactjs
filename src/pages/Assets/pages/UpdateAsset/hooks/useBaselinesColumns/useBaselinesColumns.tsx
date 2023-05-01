import { ColumnsType } from 'antd/lib/table/interface';
import Menu from 'components/Menu';
import { Dropdown } from 'antd';
import Button from 'components/Button';
import { MoreOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import StatusCell from 'pages/Assets/components/StatusCell';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import { MODIFIED_TIME_FORMAT } from '../../consts';
import { Baseline } from 'api/schema';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import useDeleteBaseline from '../useDeleteBaseline';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useDuplicateBaseline from '../useDuplicateBaseline';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';

const useBaselinesColumns = () => {
  const assetId = useAssetId();
  const { onEditRow: onEditBaseline } =
    useAddEditActions<UpdateAssetAddEditActionContext>('baselines');
  const { onDeleteBaseline, isDeletingBaseline } = useDeleteBaseline(assetId);
  const { onDuplicateBaseline, isDuplicatingBaseline } =
    useDuplicateBaseline(assetId);
  const columns: ColumnsType<Baseline> = useMemo(
    () => [
      {
        title: 'Name',
        dataIndex: 'name',
        width: 200,
      },
      {
        title: 'Modified',
        dataIndex: 'updated_at',
        width: 200,
        render: (updatedAt: Baseline['updated_at']) => {
          return format(parseISO(updatedAt), MODIFIED_TIME_FORMAT);
        },
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: 716,
      },
      {
        title: 'Status',
        dataIndex: 'draft',
        width: 200,
        render: (draft: Baseline['draft']) => {
          return <StatusCell draft={draft} />;
        },
      },
      {
        title: '',
        key: 'actions',
        className: 'ant-table-cell-actions',
        width: 48,
        render: (baseline: Baseline) => {
          const menu = (
            <Menu width={181}>
              <Menu.Item key="edit" onClick={() => onEditBaseline(baseline.id)}>
                Edit
              </Menu.Item>
              <Menu.Item
                key="duplicate"
                disabled={isDuplicatingBaseline}
                onClick={() => onDuplicateBaseline(baseline)}
              >
                Duplicate
              </Menu.Item>
              <Menu.Item
                key="delete"
                disabled={isDeletingBaseline}
                onClick={() => onDeleteBaseline(baseline)}
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
    [
      isDeletingBaseline,
      isDuplicatingBaseline,
      onDeleteBaseline,
      onDuplicateBaseline,
      onEditBaseline,
    ],
  );

  return columns;
};

export default useBaselinesColumns;
