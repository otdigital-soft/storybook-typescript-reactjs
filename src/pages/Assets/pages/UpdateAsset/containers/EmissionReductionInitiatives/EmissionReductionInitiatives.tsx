import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import { PlusOutlined } from '@ant-design/icons';
import useAssetId from 'pages/Assets/hooks/useAssetId';
import useActiveBaselineId from 'pages/Assets/pages/UpdateAsset/hooks/useActiveBaselineId';
import useEmissionManagementPlan from 'pages/Assets/pages/UpdateAsset/hooks/useEmissionManagementPlan';
import { StyledTable } from 'components/Table';
import useEmissionReductionInitiativesColumns from '../../hooks/useEmissionReductionInitiativesColumns';
import AddEmissionReductionInitiativeDrawer from 'pages/Assets/pages/UpdateAsset/containers/AddEmissionReductionInitiativeDrawer';
import EditEmissionReductionInitiativeDrawer from 'pages/Assets/pages/UpdateAsset/containers/EditEmissionReductionInitiativeDrawer';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import { UpdateAssetAddEditActionContext } from 'pages/Assets/pages/UpdateAsset/types';

const EmissionReductionInitiatives = () => {
  const assetId = useAssetId();
  const activeBaselineId = useActiveBaselineId();
  const { editedRow: editedEmissionManagementPlanId } =
    useAddEditActions<UpdateAssetAddEditActionContext>(
      'emissionManagementPlans',
    );
  const { data: emissionManagementPlanData } = useEmissionManagementPlan({
    assetId,
    baselineId: activeBaselineId,
    emissionManagementPlanId: editedEmissionManagementPlanId,
  });
  const columns = useEmissionReductionInitiativesColumns();
  const { onAddRow: onAddEmissionReductionInitiative } =
    useAddEditActions<UpdateAssetAddEditActionContext>(
      'emissionReductionInitiatives',
    );

  return (
    <>
      <Flexbox justifyContent="flex-end">
        <Button
          type="success"
          icon={<PlusOutlined />}
          onClick={() => onAddEmissionReductionInitiative()}
          fontWeight={400}
        >
          Add energy reduction initiatives
        </Button>
      </Flexbox>
      <Box marginTop={10}>
        <StyledTable
          pagination={false}
          locale={{
            emptyText: 'No energy reduction initiative added',
          }}
          columns={columns}
          dataSource={emissionManagementPlanData?.initiatives || []}
          rowKey={(row) => row.id}
        />
      </Box>
      <AddEmissionReductionInitiativeDrawer />
      <EditEmissionReductionInitiativeDrawer />
    </>
  );
};

export default EmissionReductionInitiatives;
