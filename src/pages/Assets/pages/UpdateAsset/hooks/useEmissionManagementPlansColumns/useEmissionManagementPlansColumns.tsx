import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { ColumnsType } from 'antd/lib/table/interface';
import { EmissionManagementPlan } from 'api/schema';
import Button from 'components/Button';
import Menu from 'components/Menu';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import StatusCell from 'pages/Assets/components/StatusCell';
import { useMemo } from 'react';
import { MODIFIED_TIME_FORMAT } from '../../consts';
import useDeleteEmissionManagementPlan from 'pages/Assets/pages/UpdateAsset/hooks/useDeleteEmissionManagementPlan';
import useDuplicateEmissionManagementPlan from 'pages/Assets/pages/UpdateAsset/hooks/useDuplicateEmissionManagementPlan';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';

const useEmissionManagementPlansColumns = (
  assetId: number,
  baselineId: number | undefined,
) => {
  const {
    onDuplicateEmissionManagementPlan,
    isDuplicatingEmissionManagementPlan,
  } = useDuplicateEmissionManagementPlan(assetId, baselineId);
  const { onDeleteEmissionManagementPlan, isDeletingEmissionManagementPlan } =
    useDeleteEmissionManagementPlan(assetId, baselineId);
  const { onEditRow: onEditEmissionManagementPlan } =
    useAddEditActions<UpdateAssetAddEditActionContext>(
      'emissionManagementPlans',
    );

  const columns: ColumnsType<EmissionManagementPlan> = useMemo(
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
        render: (updatedAt: EmissionManagementPlan['updated_at']) => {
          return format(parseISO(updatedAt), MODIFIED_TIME_FORMAT);
        },
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: 515,
      },
      {
        title: 'Version',
        dataIndex: 'version',
        width: 200,
      },
      {
        title: 'Status',
        dataIndex: 'draft',
        width: 200,
        render: (draft: EmissionManagementPlan['draft']) => {
          return <StatusCell draft={draft} />;
        },
      },
      {
        title: '',
        key: 'actions',
        className: 'ant-table-cell-actions',
        width: 48,
        render: (emissionManagementPlan: EmissionManagementPlan) => {
          const menu = (
            <Menu width={181}>
              <Menu.Item
                key="edit"
                onClick={() =>
                  onEditEmissionManagementPlan(emissionManagementPlan.id)
                }
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="duplicate"
                disabled={isDuplicatingEmissionManagementPlan}
                onClick={() =>
                  onDuplicateEmissionManagementPlan(emissionManagementPlan)
                }
              >
                Duplicate
              </Menu.Item>
              <Menu.Item
                key="delete"
                disabled={isDeletingEmissionManagementPlan}
                onClick={() =>
                  onDeleteEmissionManagementPlan(emissionManagementPlan)
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
    [
      isDuplicatingEmissionManagementPlan,
      isDeletingEmissionManagementPlan,
      onEditEmissionManagementPlan,
      onDuplicateEmissionManagementPlan,
      onDeleteEmissionManagementPlan,
    ],
  );

  return columns;
};

export default useEmissionManagementPlansColumns;
