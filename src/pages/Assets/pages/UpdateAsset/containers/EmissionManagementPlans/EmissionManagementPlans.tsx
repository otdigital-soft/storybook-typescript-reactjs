import { PlusOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/lib/table/interface';
import { EmissionManagementPlan } from 'api/schema';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import { Title } from 'components/Typography';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import ActiveTable from 'pages/Assets/pages/UpdateAsset/components/ActiveTable';
import useAsset from 'pages/Assets/pages/UpdateAsset/hooks/useAsset';
import useActivateEmissionManagementPlan from '../../hooks/useActivateEmissionManagementPlan';
import useEmissionManagementPlansColumns from '../../hooks/useEmissionManagementPlansColumns';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import AddEmissionManagementPlanDrawer from 'pages/Assets/pages/UpdateAsset/containers/AddEmissionManagementPlanDrawer';
import EditEmissionManagementPlanDrawer from 'pages/Assets/pages/UpdateAsset/containers/EditEmissionManagementPlanDrawer';
import useActiveBaselineId from 'pages/Assets/pages/UpdateAsset/hooks/useActiveBaselineId';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';

const EmissionManagementPlans = () => {
  const assetId = useAssetId();
  const { data: assetData } = useAsset(assetId);
  const { onAddRow: onAddEmissionManagementPlan } =
    useAddEditActions<UpdateAssetAddEditActionContext>(
      'emissionManagementPlans',
    );
  const emissionManagementPlans = assetData?.emission_management_plans || [];
  const activeBaselineId = useActiveBaselineId();
  const {
    onActivateEmissionManagementPlan,
    isActivatingEmissionManagementPlan,
  } = useActivateEmissionManagementPlan(
    Number(assetData?.id),
    activeBaselineId,
  );
  const columns = useEmissionManagementPlansColumns(
    Number(assetData?.id),
    activeBaselineId,
  );
  const rowSelection: TableRowSelection<EmissionManagementPlan> = {
    type: 'radio',
    selectedRowKeys: emissionManagementPlans
      .filter((emissionManagementPlan) => emissionManagementPlan.active)
      .map((emissionManagementPlan) => emissionManagementPlan.id),
    getCheckboxProps: (record) => ({
      disabled: record.draft || isActivatingEmissionManagementPlan,
    }),
    columnTitle: 'Active',
    onSelect: (emissionManagementPlan) =>
      onActivateEmissionManagementPlan(emissionManagementPlan),
  };

  return (
    <>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Title level={4}>Energy management plans</Title>
        <Flexbox gap={8}>
          <Box width={168}>
            <Button
              type="success"
              icon={<PlusOutlined />}
              block
              disabled={!activeBaselineId}
              onClick={onAddEmissionManagementPlan}
              fontWeight={400}
            >
              Add EMP
            </Button>
          </Box>
        </Flexbox>
      </Flexbox>
      <Box marginTop={10}>
        <ActiveTable
          pagination={false}
          rowSelection={rowSelection}
          locale={{
            emptyText: 'No energy management plan added',
          }}
          columns={columns}
          dataSource={emissionManagementPlans}
          rowKey={(row) => row.id}
          className="ant-table-with-actions"
        />
      </Box>
      <AddEmissionManagementPlanDrawer />
      <EditEmissionManagementPlanDrawer />
    </>
  );
};

export default EmissionManagementPlans;
