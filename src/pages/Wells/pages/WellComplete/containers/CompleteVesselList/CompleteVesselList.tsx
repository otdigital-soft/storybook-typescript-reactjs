import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import Box, { Flexbox } from 'components/Box';
import Button from 'components/Button';
import { Title } from 'components/Typography';
import { useAddEditActions } from 'containers/AddEditActionsProvider';
import useCurrentWellPlan from 'pages/WellPlan/hooks/useCurrentWellPlan';
import AddCompleteVesselDrawer from 'pages/Wells/pages/WellComplete/containers/AddCompleteVesselDrawer';
import EditCompleteVesselDrawer from 'pages/Wells/pages/WellComplete/containers/EditCompleteVesselDrawer';
import useApproveCompleteVessel from 'pages/Wells/pages/WellComplete/hooks/useApproveCompleteVessel';
import { WellCompleteAddEditActionContext } from 'pages/WellPlan/pages/UpdateWellCompletePlan/types';
import useCanEdit from 'pages/WellPlan/hooks/useCanEdit';
import { CompleteVesselUseList, CurrentStepEnum } from 'api/schema';
import { StyledTable } from 'components/Table';
import useDeleteCompleteVessel from 'pages/Wells/pages/WellComplete/hooks/useDeleteCompleteVessel';
import useVesselListColumns from 'pages/Wells/hooks/useVesselListColumns';
import useVesselListTableProps from 'pages/Wells/hooks/useVesselListTableProps';

const CompleteVesselList = () => {
  const {
    onAddRow: onAddVessel,
    selectedRows: selectedVesselIds,
    setSelectedRows: setSelectedVesselIds,
  } = useAddEditActions<WellCompleteAddEditActionContext>('vessels');
  const { data: wellPlanData, wellPlanId } = useCurrentWellPlan();
  const selectedVessels = wellPlanData?.complete_vessel_uses.filter((vessel) =>
    selectedVesselIds.includes(vessel.id),
  );
  const { mutate: onApproveVessel, isLoading: isApprovingVessel } =
    useApproveCompleteVessel(wellPlanId);
  const canEdit = useCanEdit(CurrentStepEnum.WELL_REVIEWING);
  const { onUnselectRow: onUnselectVesselUse } =
    useAddEditActions<WellCompleteAddEditActionContext>('vessels');
  const vessels = wellPlanData?.complete_vessel_uses || [];
  const { onDeleteCompleteVessel } = useDeleteCompleteVessel(wellPlanId);
  const onDelete = (vesselUse: CompleteVesselUseList) => {
    onDeleteCompleteVessel({
      vesselUseId: vesselUse.id,
      vesselType: vesselUse.vessel_type.type,
      onDelete: () => {
        onUnselectVesselUse(vesselUse.id);
      },
    });
  };
  const vesselListColumns = useVesselListColumns<CompleteVesselUseList>();
  const vesselListTableProps = useVesselListTableProps<
    CompleteVesselUseList,
    WellCompleteAddEditActionContext
  >({
    onDeleteVesselUse: onDelete,
    context: 'vessels',
    editable: canEdit,
    extraActions: [
      {
        key: 'approve',
        menuItemProps: ({ id, vessel_type, approved }) => ({
          children: 'Approve',
          disabled: approved || !canEdit,
          onClick: () =>
            onApproveVessel({
              vesselTypes: [vessel_type.type],
              vesselUseIds: [id],
            }),
        }),
      },
    ],
    columns: vesselListColumns,
    rowSelection: true,
  });

  return (
    <>
      <Flexbox justifyContent="space-between" alignItems="center">
        <Title level={4}>Vessels</Title>
        <Flexbox gap={8}>
          <Box width={168}>
            <Button
              type="success"
              icon={<PlusOutlined />}
              block
              onClick={onAddVessel}
              disabled={!canEdit}
              fontWeight={400}
            >
              Add vessel
            </Button>
          </Box>
          <Box width={168}>
            <Button
              type="success"
              icon={<CheckOutlined />}
              disabled={
                !selectedVessels?.length || isApprovingVessel || !canEdit
              }
              block
              fontWeight={400}
              onClick={() => {
                if (selectedVessels?.length) {
                  onApproveVessel({
                    vesselTypes: selectedVessels.map(
                      (vessel) => vessel.vessel_type.type,
                    ),
                    vesselUseIds: selectedVessels.map((vessel) => vessel.id),
                    onSuccess: () => setSelectedVesselIds([]),
                  });
                }
              }}
            >
              Approve
            </Button>
          </Box>
        </Flexbox>
      </Flexbox>
      <Box marginTop={11}>
        <StyledTable<CompleteVesselUseList>
          dataSource={vessels}
          {...vesselListTableProps}
        />
      </Box>
      <AddCompleteVesselDrawer />
      <EditCompleteVesselDrawer />
    </>
  );
};

export default CompleteVesselList;
