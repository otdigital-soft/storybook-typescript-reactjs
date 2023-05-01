import { ColumnsType } from 'antd/lib/table/interface';
import { EmissionManagementPlanDetailsInitiative } from 'api/schema';
import { useMemo } from 'react';
import Menu from 'components/Menu';
import { Dropdown } from 'antd';
import Button from 'components/Button';
import { MoreOutlined } from '@ant-design/icons';
import { EMISSION_REDUCTION_INITIATIVE_TYPE_NAME_MAP } from 'pages/Assets/consts';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';
import useDeleteEmissionReductionInitiative from 'pages/Assets/pages/UpdateAsset/hooks/useDeleteEmissionReductionInitiative';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useActiveBaselineId from 'pages/Assets/pages/UpdateAsset/hooks/useActiveBaselineId';
import parseISO from 'date-fns/parseISO';
import { DATE_FORMAT_WITH_DOTS } from 'consts';
import format from 'date-fns/format';

const useEmissionReductionInitiativesColumns = () => {
  const { onEditRow: onEditEmissionReductionInitiative } =
    useAddEditActions<UpdateAssetAddEditActionContext>(
      'emissionReductionInitiatives',
    );
  const { editedRow: editedEmissionManagementPlanId } =
    useAddEditActions<UpdateAssetAddEditActionContext>(
      'emissionManagementPlans',
    );
  const assetId = useAssetId();
  const activeBaselineId = useActiveBaselineId();
  const {
    onDeleteEmissionReductionInitiative,
    isDeletingEmissionReductionInitiative,
  } = useDeleteEmissionReductionInitiative({
    assetId,
    baselineId: activeBaselineId,
    emissionManagementPlanId: editedEmissionManagementPlanId,
  });

  const columns: ColumnsType<EmissionManagementPlanDetailsInitiative> = useMemo(
    () => [
      {
        title: 'ERI name',
        dataIndex: 'name',
        width: 217,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: 248,
      },
      {
        title: 'Type',
        dataIndex: 'type',
        width: 200,
        render: (type: EmissionManagementPlanDetailsInitiative['type']) => {
          return EMISSION_REDUCTION_INITIATIVE_TYPE_NAME_MAP[type];
        },
      },
      {
        title: 'Vendor',
        dataIndex: 'vendor',
        width: 200,
      },
      {
        title: 'Deployment date',
        dataIndex: 'deployment_date',
        width: 200,
        render: (
          deploymentDate: EmissionManagementPlanDetailsInitiative['deployment_date'],
        ) => {
          return format(parseISO(deploymentDate), DATE_FORMAT_WITH_DOTS);
        },
      },
      {
        title: '',
        key: 'actions',
        className: 'ant-table-cell-actions',
        width: 48,
        render: (
          emissionReductionInitiative: EmissionManagementPlanDetailsInitiative,
        ) => {
          const menu = (
            <Menu width={181}>
              <Menu.Item
                key="edit"
                onClick={() =>
                  onEditEmissionReductionInitiative(
                    emissionReductionInitiative.id,
                  )
                }
              >
                Edit
              </Menu.Item>
              <Menu.Item
                key="delete"
                disabled={isDeletingEmissionReductionInitiative}
                onClick={() =>
                  onDeleteEmissionReductionInitiative(
                    emissionReductionInitiative,
                  )
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
      isDeletingEmissionReductionInitiative,
      onDeleteEmissionReductionInitiative,
      onEditEmissionReductionInitiative,
    ],
  );

  return columns;
};

export default useEmissionReductionInitiativesColumns;
